# import package
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import errorcode
import json
from datetime import *
from flask_cors import CORS

# set up config
config = {
    "host": "cloudnative.mysql.database.azure.com",
    "user": "myadmin",
    "password": "Temp0000",
    "database": "user",
    "client_flags": [mysql.connector.ClientFlag.SSL],
    "ssl_ca": "./DigiCertGlobalRootG2.crt.pem",
}

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def EntryPage():
    return 'Hello, World!'


def execute_query(query, params=None):
    """
    執行 sql query，並回傳結果，看這樣能不能簡化其他地方的 code
    目前只有用在 delete_user 和 delete_record
    """
    try:
        with mysql.connector.connect(**config) as conn:
            with conn.cursor() as cursor:
                if params:
                    cursor.execute(query, params)
                else:
                    cursor.execute(query)
                rows = cursor.fetchall()
                conn.commit()
                
                return rows
    except mysql.connector.Error as err:
        print("Database not connected: {}".format(err))
        return json.dumps({"error": "database not connected"}), 200


@app.route("/get_space_history")
def get_space_history():
    # 接收 request
    selected_date = request.args.get("date")
    parking_space_id = request.args.get("parking_space_id")
    pre = parking_space_id[:2]
    post = int(parking_space_id[2:])

    if pre == 'B2':
        parking_space_id = "PS" + str(post).zfill(3)
    elif pre == 'B1':
        parking_space_id = "PS" + str(post+20).zfill(3)
    elif pre == '1F':
        parking_space_id = "PS" + str(post+40).zfill(3)
    else:
        parking_space_id = "PS" + str(post+60).zfill(3)
    # Construct connection string

    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            dic = {"err_msg": "Something is wrong with the user name or password"}
            json_string = json.dumps(dic)
            return json_string
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            dic = {"err_msg": "Database does not exist"}
            json_string = json.dumps(dic)
            return json_string
        else:
            dic = {"err_msg": str(err)}
            json_string = json.dumps(dic)
            return json_string
    else:
        cursor = conn.cursor()

        # Read data
        beg = selected_date + " 00:00:00 "
        end = selected_date + " 23:59:59 "
        sql = (
            "SELECT * FROM record WHERE enter_time BETWEEN '"
            + beg
            + "' AND '"
            + end
            + "' AND parking_space_id ='"
            + parking_space_id
            + "';"
        )

        cursor.execute(sql)
        rows = cursor.fetchall()

    # 包成 json 回傳
    res = {"get_space_history": []}
    for row in rows:
        dic = {}
        sql = "SELECT plate FROM users WHERE user_id = '" + str(row[1]) + "';"
        cursor.execute(sql)
        single = cursor.fetchone()
        dic["plate"] = single[0]
        dic["enter_time"] = str(row[3])
        dic["exit_time"] = str(row[4])
        dic["duration"] = (row[4] - row[3]).total_seconds() / 60
        j = json.dumps(dic)
        res["get_space_history"].append(j)

    # Cleanup
    conn.commit()
    cursor.close()
    conn.close()
    print("Done.")

    # 回傳 json
    response = res
    return response


@app.route("/get_abnormal_space")
def get_abnormal_space():
    # Construct connection string
    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            dic = {"err_msg": "Something is wrong with the user name or password"}
            json_string = json.dumps(dic)
            return json_string
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            dic = {"err_msg": "Database does not exist"}
            json_string = json.dumps(dic)
            return json_string
        else:
            dic = {"err_msg": str(err)}
            json_string = json.dumps(dic)
            return json_string
    else:
        cursor = conn.cursor()

        sql = """
            SELECT users.name, users.cellphone_number, users.email, users.plate, record.enter_time, record.parking_space_id 
            FROM users INNER JOIN  record ON users.user_id = record.user_id 
            WHERE record.exit_time is null;
            """

        cursor.execute(sql)
        rows = cursor.fetchall()

        # Cleanup
        conn.commit()
        cursor.close()
        conn.close()

    # 抓超過一天的加進要回傳的 json
    now = datetime.now()
    res = {"get_abnormal_space": []}
    for row in rows:
        diff = now - row[4]
        if diff.days >= 1: 
            dic = {}
            num = int(row[5][-2:])
            if num <= 20:
                park = "B2"+str(num).zfill(2)
            elif num <=40:
                park = "B1"+str(num-20).zfill(2)
            elif num<=60:
                park = "1F"+str(num-40).zfill(2)
            else:
                park = "2F"+str(num-60).zfill(2)
                
            dic["plate"] = row[3]
            dic["name"] = row[0]
            dic["parking_space_id"] = park
            dic['duration'] = int((now - row[4]).total_seconds()/60)
            json_string = json.dumps(dic)
            res['get_abnormal_space'].append(json_string)


    response = res
    return response


@app.route("/get_space_usage_rate")
def get_space_usage_rate():
    # 接收 request
    selected_date = request.args.get("date")

    # Construct connection string
    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            dic = {"err_msg": "Something is wrong with the user name or password"}
            json_string = json.dumps(dic)
            return json_string
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            dic = {"err_msg": "Database does not exist"}
            json_string = json.dumps(dic)
            return json_string
        else:
            dic = {"err_msg": str(err)}
            json_string = json.dumps(dic)
            return json_string
    else:
        cursor = conn.cursor()
        beg = selected_date + " 00:00:00 "
        end = selected_date + " 23:59:59 "
        sql = (
            "SELECT * FROM record WHERE (enter_time BETWEEN '"
            + beg
            + "' AND '"
            + end
            + "') OR (exit_time BETWEEN '"
            + beg
            + "' AND '"
            + end
            + "') OR ('"
            + selected_date
            + "' BETWEEN enter_time AND exit_time) ;"
        )

        cursor.execute(sql)
        rows = cursor.fetchall()

        # Cleanup
        conn.commit()
        cursor.close()
        conn.close()

    # 計算每個停車位的 time stamp 比例
    beg = datetime.strptime(selected_date + " 00:00:00", "%Y-%m-%d %H:%M:%S")
    end = datetime.strptime(selected_date + " 23:59:59", "%Y-%m-%d %H:%M:%S")
    divider = end.timestamp() - beg.timestamp()
    time_stamp = [0] * 80
    for row in rows:
        if row[3] > beg:
            if row[4] == None or row[4] > end:
                duration = end.timestamp() - row[3].timestamp()
            else:
                duration = row[4].timestamp() - row[3].timestamp()
        elif row[3] < beg:
            if row[4] == None or row[4] > end:
                duration = end.timestamp() - beg.timestamp()
            else:
                duration = row[4].timestamp() - beg.timestamp()
        idx = int(row[2][2:])
        time_stamp[idx] += (duration / divider) * 100

    # 將樓層與停車位的使用率加進字典並轉成 json
    json_string = ""
    dic1 = {}
    dic2 = {
        "1": sum(time_stamp[0:20]) / 20,
        "2": sum(time_stamp[20:40]) / 20,
        "3": sum(time_stamp[40:60]) / 20,
        "4": sum(time_stamp[60:80]) / 20,
    }
    for idx, value in enumerate(time_stamp):
        dic1["PS" + str(idx + 1).zfill(3)] = value

    # 包成json
    f2 = sum(time_stamp[60:80]) / 2000
    f1 = sum(time_stamp[40:60]) / 2000
    b1 = sum(time_stamp[20:40]) / 2000
    b2 = sum(time_stamp[0:20]) / 2000
    res = {"get_space_usage_rate": []}
    d0 = {"floor": "all", "occupied": (f2 + f1 + b1 + b2) / 4, "vacant": 0.33}
    d1 = {"floor": "2F", "occupied": f2, "vacant": 1 - f2}
    d2 = {"floor": "1F", "occupied": f1, "vacant": 1 - f1}
    d3 = {"floor": "B1", "occupied": b1, "vacant": 1 - b1}
    d4 = {"floor": "B2", "occupied": b2, "vacant": 1 - b2}

    res["get_space_usage_rate"].append(json.dumps(d0))
    res["get_space_usage_rate"].append(json.dumps(d1))
    res["get_space_usage_rate"].append(json.dumps(d2))
    res["get_space_usage_rate"].append(json.dumps(d3))
    res["get_space_usage_rate"].append(json.dumps(d4))

    response = res
    return response


@app.route("/get_reserve_info", methods=["GET"])
def get_reserve_info():
    """
    3. /get_reserve_info (使用者查看預約的停車位資訊)
        參數: {user_id} 回傳: {expire_time, floor, number}
    """
    user_id = request.args.get("user_id")
    if not user_id:
        return json.dumps({"error": "user id not provided"}), 400

    # Construct connection string
    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
            return err_msg
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
            return err_msg
        else:
            err_msg = err
            return err
    else:
        cursor = conn.cursor()

        sql = "SELECT parking_spaces.floor, parking_spaces.number, record.reserve_time "
        sql += "FROM record "
        sql += "INNER JOIN parking_spaces ON record.parking_space_id = parking_spaces.parking_space_id "
        sql += "INNER JOIN parking_space_status ON record.parking_space_id = parking_space_status.parking_space_id "
        sql += "WHERE record.user_id = %s AND parking_space_status.status = 1;"

        cursor.execute(sql, (str(user_id),))        
        rows = cursor.fetchall()
        print(rows)
        # Cleanup
        conn.commit()
        cursor.close()
        conn.close()

        # 包成 JSON 回傳
        json_string = ""
        for row in rows:
            dic = {}
            dic["floor"] = row[0]
            dic["number"] = row[1]

            # Calculate the expired time by adding 30 minutes to the reverse_time
            reverse_time = datetime.strptime(str(row[2]), "%Y-%m-%d %H:%M:%S")
            expired_time = reverse_time + timedelta(minutes=30)

            # 2023-04-01T05:00:30
            dic["expired_time"] = expired_time.isoformat(timespec="seconds")
            json_string += json.dumps(dic)

    # 回傳 json
    response = json_string
    return response, 200, {"Content-Type": "application/json"}

@app.route("/get_car_info", methods=["GET"])
def get_car_info():
    """
    4. /get_car_info
        參數: {user_id} 回傳: parking_space_id
    """
    user_id = request.args.get("user_id")
    if not user_id:
        return json.dumps({"error": "user id not provided"}), 400

    # Construct connection string
    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
            return err_msg
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
            return err_msg
        else:
            err_msg = err
            return err
    else:
        cursor = conn.cursor()
        sql = "SELECT users.plate, record.parking_space_id, record.exit_time, record.reserve_time "
        sql += "FROM record INNER JOIN users on record.user_id = users.user_id "
        sql += "WHERE record.user_id = %s;"
        cursor.execute(sql, (str(user_id),))
        
        rows = cursor.fetchall()
        # Cleanup
        conn.commit()
        cursor.close()
        conn.close()

    # 選出最新的 reserve_time 的 row
    latest_reserve_time = None
    latest_row = None
    for row in rows:
        plate, parking_space, exit_time, reserve_time = row

        # Check if reserve_time is not None and is greater than the current latest_reserve_time
        if (latest_reserve_time is None or reserve_time > latest_reserve_time):
            latest_row = row
    
    # 包成 json 回傳
    json_string = ""
    plate, parking_space, exit_time, reserve_time = latest_row
    dic = {}
    dic["plate"] = plate

    if exit_time is not None:
        dic["parking_space_id"] = ""
        json_string += json.dumps(dic)
    else:
        num = int(parking_space[-2:])
        if num <= 20:
            park = "B2"+str(num).zfill(2)
        elif num <=40:
            park = "B1"+str(num-20).zfill(2)
        elif num<=60:
            park = "1F"+str(num-40).zfill(2)
        else:
            park = "2F"+str(num-60).zfill(2)
        dic["parking_space_id"] = park
        json_string += json.dumps(dic)

    # 回傳 json
    response = json_string
    return response, 200, {"Content-Type": "application/json"}


@app.route("/get_user_info", methods=["GET"])
def get_user_info():
    user_id = request.args.get("user_id")

    # Construct connection string
    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
            return err_msg
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
            return err_msg
        else:
            err_msg = err
            return err
    else:
        cursor = conn.cursor()
        sql = "SELECT * "
        sql += "FROM users  "
        sql += "WHERE users.user_id = '" + user_id + "';"

        cursor.execute(sql)
        rows = cursor.fetchall()

        # Cleanup
        conn.commit()
        cursor.close()
        conn.close()

    json_string = ""
    for row in rows:
        dic = {}
        dic["name"] = row[1]
        dic["priority"] = row[2]
        dic["email"] = row[3]
        dic["cellphone"] = row[4]
        dic["plate"] = row[5]
        dic["preference_floor"] = row[6]
        json_string += json.dumps(dic)

    # 回傳 json
    response = json_string
    return response, 200, {"Content-Type": "application/json"}


@app.route("/get_empty_parking_space", methods=["GET"])
def get_empty_parking_space():
    # if slot is priority should it be counted in the available slots?
    # Construct connection string
    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
            return err_msg
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
            return err_msg
        else:
            err_msg = err
            return err
    else:
        cursor = conn.cursor()

        sql = "SELECT floor,status FROM parking_space_status INNER JOIN parking_spaces ON parking_space_status.parking_space_id = parking_spaces.parking_space_id;"
        cursor.execute(sql)
        rows = cursor.fetchall()

        conn.commit()
        cursor.close()
        conn.close()

    json_string = ""

    dic = []
    key1 = 0
    key2 = 0
    # 0: available, 1: occupied, 2: reserved
    mapping = {0: True, 1: False, 2: False}
    for row in rows:
        floor = row[0]
        status = row[1]
        if floor not in [s["floor"] for s in dic]:
            dic.append(
                {
                    "key": f"space-{key1}",
                    "floor": floor,
                    "num_parking_space": 0,
                    "list_of_status": [],
                }
            )
            key1 += 1

        ele = [s for s in dic if s["floor"] == floor][0]
        if status == 0:
            ele["num_parking_space"] += 1

        key2 += 1
        ele["list_of_status"].append(
            {"key": f"status-{key2}", "status": mapping[status]}
        )
    response = json.dumps(dic)
    return response, 200, {"Content-Type": "application/json"}


@app.route("/create_user", methods=["POST"])
def create_user():
    body = request.get_json()
    params = body.keys()
    if (
        "user_id" not in params 
        or "name" not in params 
        or "email" not in params
        or "cellphone_number" not in params
        or "plate" not in params
    ):
        return json.dumps({"isSuccess": False, "message":"parameters missing"}), 400

    # TODO
    user_id = body.get("user_id")
    name = body.get("name")
    email = body.get("email")
    cellphone_number = body.get("cellphone_number")
    plate = body.get("plate")
    preference_floor = body.get("preference")
    # Construct connection string
    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
        else:
            err_msg = err
        return json.dumps({"isSuccess": False,"message":err_msg}), 500
    else:
        cursor = conn.cursor()
                
        if preference_floor:
            sql = f"INSERT INTO users (user_id, name, priority, email, cellphone_number, plate, preference_floor) VALUES ( '{str(user_id)}'  ,  '{name}' , '0' , '{email}' , '{str(cellphone_number)}' , '{plate}' , '{preference_floor}');"
        else:
            sql = f"INSERT INTO users (user_id, name, priority, email, cellphone_number, plate, preference_floor) VALUES ( '{str(user_id)}'  ,  '{name}' , '0' , '{email}' , '{str(cellphone_number)}' , '{plate}' , '{1}');"

        try:
            cursor.execute(sql)
        except mysql.connector.errors.IntegrityError:
            return json.dumps({"isSuccess": False,'message':'The account has been registered.'}), 400
        conn.commit()
        cursor.close()
        conn.close()
        return json.dumps({"isSuccess": True,"message":"Insert Successfully"}), 200


@app.route("/create_record", methods=["POST"])
def create_record():
    mapping = {'2F': 4, '1F': 3, 'B1': 2, 'B2': 1}
    body = request.get_json()
    if not body.get("user_id"):
        return json.dumps({"error": "user id not provided"}), 200

    user_id = body.get("user_id")
    if body.get("parking_space_id"):
        parking_space_param = body.get("parking_space_id")
    else:
        parking_space_param = None

    try:
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
            return err_msg
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
            return err_msg
        else:
            err_msg = err
            return err
    else:
        cursor = conn.cursor()
        # check if user has any 預約中未過期 or 進場未出場
        sql = f"SELECT * FROM record WHERE user_id = '{user_id}' AND ((reserve_time + INTERVAL 30 MINUTE) > CURRENT_TIMESTAMP) "
        

        cursor.execute(sql)
        rows = cursor.fetchall()
        if len(rows) != 0:
            return json.dumps({"isSuccess": False,'message':'User is already reserving a seat'}), 400
        
        # check if user has parked a car
        sql = f"SELECT * FROM record WHERE user_id = '{user_id}' AND enter_time IS NOT NULL AND exit_time IS NULL"
        cursor.execute(sql)
        rows = cursor.fetchall()
        if len(rows) != 0:
            return json.dumps({"isSuccess": False,'message':'User has parked a car'}), 400


        slot = None
        if parking_space_param:
            desired_floor, desired_number = mapping[parking_space_param[:2]], int(parking_space_param[2:].lstrip('0'))
            print(desired_floor)
            print(desired_number)
            cursor.execute(
                f'''SELECT parking_space_status.parking_space_id, status FROM parking_space_status 
                inner join parking_spaces ON parking_space_status.parking_space_id = parking_spaces.parking_space_id 
                WHERE parking_spaces.floor = {desired_floor}
                AND parking_spaces.number = {desired_number};'''
            )
            rows = cursor.fetchall()
            parking_space_id = rows[0][0]
            if rows[0][1] == 1:
                return (
                    json.dumps(
                        {"isSuccess": False, "error": "parking space is not available"}
                    ),
                    200,
                )
            else:
                cursor.execute(
                    f"SELECT floor,number FROM parking_spaces WHERE parking_space_id = '{parking_space_id}';"
                )
                rows = cursor.fetchall()
                floor = rows[0][0]
                number = rows[0][1]
                now_tm = datetime.now()
                now_str = now_tm.strftime("%Y-%m-%d %H:%M:%S")
                expire_tm = now_tm + timedelta(minutes=30)
                expire_str = expire_tm.strftime("%Y-%m-%dT%H:%M:%S")
                # cursor.execute(f"UPDATE parking_space_status SET status = 1 WHERE parking_space_id = '{parking_space_id}';")
                # conn.commit()
                print(
                    f"INSERT INTO record (user_id, parking_space_id, enter_time, exit_time, reserve_time) VALUES ('{user_id}', '{parking_space_id}', NULL, NULL, '{now_str}');"
                )
                cursor.execute(
                    f"INSERT INTO record (user_id, parking_space_id, enter_time, exit_time, reserve_time) VALUES ('{user_id}', '{parking_space_id}', NULL, NULL, '{now_str}');"
                )
                cursor.execute(
                    f"UPDATE parking_space_status SET status = 1 WHERE parking_space_id = '{parking_space_id}';"
                )
                conn.commit()
                return (
                    json.dumps(
                        {
                            "isSuccess": True,
                            "expire_time": expire_str,
                            "floor": floor,
                            "number": number,
                        }
                    ),
                    200,
                )

        else:
            # quick parking
            cursor.execute(
                f"SELECT preference_floor FROM users WHERE user_id = '{user_id}';"
            )
            rows = cursor.fetchall()
            preference_floor = rows[0][0]

            cursor.execute(f"SELECT priority FROM users WHERE user_id = '{user_id}';")
            priority_row = cursor.fetchall()
            get_status_sql = """SELECT parking_space_status.parking_space_id, floor,status, priority, number
                             FROM parking_space_status INNER JOIN parking_spaces
                             ON parking_space_status.parking_space_id = parking_spaces.parking_space_id;"""
            cursor.execute(get_status_sql)
            status = cursor.fetchall()

            if priority_row[0][0] == 1:
                # ( for priority user )
                available_priority_parking_space = []
                available_priority_parking_space_floor = []

                for row in status:
                    if row[2] == 0 and row[3] == 1:
                        if row[1] == preference_floor:
                            available_priority_parking_space_floor.append(row)
                        available_priority_parking_space.append(row)
                if len(available_priority_parking_space_floor) != 0:
                    slot = available_priority_parking_space_floor[0]
                elif len(available_priority_parking_space) != 0:
                    slot = available_priority_parking_space[0]

            if priority_row[0][0] == 0 or (slot is None):
                # if a person (specified slot or priority) still still has no slot
                # then find a normal slot for him
                # ( for normal user )
                available_normal_parking_space = []
                available_normal_parking_space_floor = []

                for row in status:
                    if row[2] == 0 and row[3] == 0:
                        if row[1] == preference_floor:
                            available_normal_parking_space_floor.append(row)
                        available_normal_parking_space.append(row)
                if len(available_normal_parking_space_floor) != 0:
                    slot = available_normal_parking_space_floor[0]
                elif len(available_normal_parking_space) != 0:
                    slot = available_normal_parking_space[0]

            # if available parking space is not found (may be different for priority and normal user)
            # return error message
            if slot is None:
                return (
                    json.dumps(
                        {"isSuccess": False, "error": "parking space is not available"}
                    ),
                    200,
                )
            else:
                # record_id | user_id | parking_space_id | enter_time          | exit_time           | reserve_time
                now_tm = datetime.now()
                now_str = now_tm.strftime("%Y-%m-%d %H:%M:%S")
                expire_tm = now_tm + timedelta(minutes=30)
                expire_str = expire_tm.strftime("%Y-%m-%dT%H:%M:%S")
                cursor.execute(
                    f"UPDATE parking_space_status SET status = 1 WHERE parking_space_id = '{parking_space_id}';"
                )
                conn.commit()
                cursor.execute(
                    f"INSERT INTO record (user_id, parking_space_id, enter_time, exit_time, reserve_time) VALUES ('{user_id}', '{parking_space_id}', NULL, NULL, '{now_str}');"
                )
                conn.commit()
                return (
                    json.dumps(
                        {
                            "isSuccess": True,
                            "expire_time": expire_str,
                            "floor": slot[1],
                            "number": slot[4],
                        }
                    ),
                    200,
                )


@app.route("/update_user_preference", methods=["POST"])
def update_user_preference():
    try:
        # user_id, floor (optional), plate (optional)
        # Get the JSON data from the request body
        json_string = ""
        body = request.get_json()
        user_id = body.get("user_id")
        if body.get("floor") != None:
            floor = body.get("floor")
        else:
            floor = None

        if body.get("plate") != None:
            plate = body.get("plate")
        else:
            plate = None
        # Access data from the JSON payload
        if not floor and not plate:
            json_string += json.dumps({"isSuccess": False,"message":"No data to update"})
            return (json_string, 400)
        # Process the data (you can perform any logic here)
        else:
            # Construct connection string
            try:
                conn = mysql.connector.connect(**config)
                print("Connection established")
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                    err_msg = "Something is wrong with the user name or password"
                    return err_msg
                elif err.errno == errorcode.ER_BAD_DB_ERROR:
                    err_msg = "Database does not exist"
                    return err_msg
                else:
                    err_msg = err
                return json.dumps({"isSuccess": False,"message":err_msg}),500
            else:
                cursor = conn.cursor()
                if floor and plate:
                    sql = (
                        "UPDATE users SET preference_floor = '"
                        + str(floor)
                        + "', plate = '"
                        + str(plate)
                        + "' WHERE user_id = '"
                        + str(user_id)
                        + "';"
                    )
                elif floor:
                    sql = (
                        "UPDATE users SET preference_floor = '"
                        + str(floor)
                        + "' WHERE user_id = '"
                        + str(user_id)
                        + "';"
                    )
                else:
                    sql = (
                        "UPDATE users SET plate = '"
                        + str(plate)
                        + "' WHERE user_id = '"
                        + str(user_id)
                        + "';"
                    )
                cursor.execute(sql)
                conn.commit()
                cursor.close()
                conn.close()
                json_string += json.dumps({"isSuccess": True,"message":"Update successfully"})
                return (json_string, 200)

    except Exception as e:
        # Handle exceptions (e.g., invalid JSON format)
        error_message = {"isSuccess":False,"message": f"Error processing the request: {str(e)}"}
        return json.dumps(error_message), 400


@app.route("/delete_user", methods=["DELETE"])
def delete_user():
    body = request.get_json()
    user_id = body.get("user_id")
    try:
        delete_sql = "DELETE FROM users "
        delete_sql += "WHERE user_id = '" + str(user_id) + "';"
        print(delete_sql)
        print(execute_query(delete_sql))

        # Provide a success message
        response_message = f"user_id:{user_id} is deleted successfully"
        return jsonify({"message": response_message, "isSuccess": True}), 200
    except Exception as e:
        response_message = "User deletion failed"
        return jsonify({"message": response_message, "isSuccess": False}), 400


@app.route("/delete_record", methods=["DELETE"])
def delete_record():
    """(取消預約or時間到)時，刪除record資料表的資料"""
    body = request.get_json()
    user_id = body.get("user_id")
    try:
        # if (click_delete_button):
        #     delete_sql = "DELETE FROM record WHERE user_id = '" + str(user_id) + "';"
        # else:
        #delete_sql = "DELETE FROM record WHERE (reserve_time + INTERVAL 30 MINUTE) < CURRENT_TIMESTAMP ;"
        # TODO if user id not given, delete records that are expired( enter time is not null)
        select_sql = "SELECT * FROM record WHERE user_id = '" + str(user_id) + "' AND enter_time IS NULL;"
        rows = execute_query(select_sql)
        if len(rows) == 0:
            return jsonify({"message": "No record to delete", "isSuccess": False}), 400
        
        parking_space_id = rows[0][2]
        update_sql = f"UPDATE parking_space_status SET status = 0 WHERE parking_space_id = '{parking_space_id}';"
        execute_query(update_sql)
        delete_sql = "DELETE FROM record WHERE user_id = '" + str(user_id) + "';"
        execute_query(delete_sql)

        # Provide a success message
        response_message = f"Record deleted successfully."
        return jsonify({"isSuccess": True}), 200
    except Exception as e:
        response_message = "Record deletion failed"
        return jsonify({"message": response_message, "isSuccess": False}), 400


@app.route("/car_enter", methods=["POST"])
def car_enter():
    body = request.get_json()
    user_id = body.get("user_id")
    try:
        # Construct connection string
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
            return err_msg
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
            return err_msg
        else:
            err_msg = err
            return err
    else:
        cursor = conn.cursor()
        sql = f"SELECT * FROM record WHERE user_id = '{user_id}' AND enter_time IS NULL AND (reserve_time + INTERVAL 30 MINUTE) > CURRENT_TIMESTAMP;"
        cursor.execute(sql)
        rows = cursor.fetchall()
        if len(rows) == 0:
            return (
                json.dumps({"isSuccess": False, "message": "user has no record"}),
                200,
            )
        else:
            record_id = rows[0][0]
            parking_space_id = rows[0][2]
            update_status = f"UPDATE parking_space_status SET status = 2 WHERE parking_space_id = '{parking_space_id}';"
            cursor.execute(update_status)
            record_sql = f"UPDATE record SET enter_time = CURRENT_TIMESTAMP WHERE record_id = '{record_id}';"
            cursor.execute(record_sql)

            conn.commit()
            cursor.close()
            conn.close()
            return json.dumps({"isSuccess": True, "message":"car parked successfully"}), 200
        

@app.route("/car_leave", methods=["POST"])
def car_leave():
    body = request.get_json()
    user_id = body.get("user_id")
    try:
        # Construct connection string
        conn = mysql.connector.connect(**config)
        print("Connection established")
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            err_msg = "Something is wrong with the user name or password"
            return err_msg
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            err_msg = "Database does not exist"
            return err_msg
        else:
            err_msg = err
            return err
    else:
        cursor = conn.cursor()
        sql = f"SELECT * FROM record WHERE user_id = '{user_id}' AND (enter_time IS NOT NULL) AND (exit_time IS NULL);"
        cursor.execute(sql)
        rows = cursor.fetchall()
        if len(rows) == 0:
            return (
                json.dumps({"isSuccess": False, "message": "user has no record"}),
                200,
            )
        else:
            record_id = rows[0][0]
            parking_space_id = rows[0][2]
            update_status = f"UPDATE parking_space_status SET status = 0 WHERE parking_space_id = '{parking_space_id}';"
            cursor.execute(update_status)
            record_sql = f"UPDATE record SET exit_time = CURRENT_TIMESTAMP WHERE record_id = '{record_id}';"
            cursor.execute(record_sql)

            conn.commit()
            cursor.close()
            conn.close()
            return json.dumps({"isSuccess": True, "message":"car leave successfully"}), 200
        

if __name__ == "__main__":
    app.run(debug=True)