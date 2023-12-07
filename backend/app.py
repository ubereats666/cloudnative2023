# import package
from flask import Flask
from flask import render_template
from flask import request
import mysql.connector
from mysql.connector import errorcode
import json
from datetime import *

# set up config
config = {
  'host':'cloudnative.mysql.database.azure.com',
  'user':'myadmin',
  'password':'Temp0000',
  'database':'user',
  'client_flags': [mysql.connector.ClientFlag.SSL],
  'ssl_ca': './DigiCertGlobalRootG2.crt.pem',
}

app = Flask(__name__)

@app.route('/')
def jimijim123():
    pass

@app.route('/get_space_history')
def get_space_history():
    # 接收 request
    selected_date = request.args.get('date')
    parking_space_id = request.args.get('parking_space_id')

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

    # Read data
        beg = selected_date + " 00:00:00 "
        end = selected_date + " 23:59:59 "
        sql = "SELECT * FROM record WHERE enter_time BETWEEN '" + beg + "' AND '" + end +"' AND parking_space_id ='"+parking_space_id+ "';"

        cursor.execute(sql)
        rows = cursor.fetchall()

        # Cleanup
        conn.commit()
        cursor.close()
        conn.close()
        
    # 包成 json 回傳
    json_string = ""
    for row in rows:
        dic = {}
        dic["record_id"] = row[0]
        dic["user_id"] = row[1]
        dic["parking_space_id"] = row[2]
        dic["enter_time"] = str(row[3])
        dic["exit_time"] = str(row[4])
        dic["reserve_time"] = str(row[5])
        json_string += json.dumps(dic)

    # 回傳 json
    response = json_string  
    return response,200,{"Content-Type":"application/json"}

app.route('/get_abnormal_space')
def get_abnormal_space():
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

        sql = """
            SELECT users.name, users.cellphone_number, users.email, users.plate, record.enter_time, record.parking_space_id 
            FROM users INNER JOIN  record ON users.user_id = record.user_id 
            WHERE record.exit_time is null;
            """

        cursor.execute(sql)
        rows = cursor.fetchall()
        
        #Cleanup
        conn.commit()
        cursor.close()
        conn.close()
        
    # 抓超過一天的加進要回傳的 json
    now = datetime.now()
    json_string = ""
    for row in rows:
        diff = now - row[4]
        if diff.days >= 1: 
            dic = {}
            dic["name"] = row[0]
            dic["cellphone_number"] = row[1]
            dic["email"] = row[2]
            dic["plate"] = row[3]
            dic["enter_time"] = str(row[4])
            dic["parking_space_id"] = row[5]
            json_string += json.dumps(dic)

    response = json_string
    return response,200,{"Content-Type":"application/json"}

app.route('/get_space_usage_rate')
def get_space_usage_rate():
    # 接收 request
    selected_date = request.args.get('date')

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
        beg = selected_date + " 00:00:00 "
        end = selected_date + " 23:59:59 "
        sql = "SELECT * FROM record WHERE (enter_time BETWEEN '" + beg + "' AND '" + end +"') OR (exit_time BETWEEN '"+ beg+"' AND '" + end +"') OR ('"+selected_date+"' BETWEEN enter_time AND exit_time) ;"

        cursor.execute(sql)
        rows = cursor.fetchall()
        
        #Cleanup
        conn.commit()
        cursor.close()
        conn.close()
        
    # 計算每個停車位的 time stamp 比例
    beg = datetime.strptime(selected_date + " 00:00:00", '%Y-%m-%d %H:%M:%S')
    end = datetime.strptime(selected_date + " 23:59:59", '%Y-%m-%d %H:%M:%S') 
    divider = end.timestamp() - beg.timestamp()
    time_stamp = [0]*80
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
        time_stamp[idx] += (duration/divider)*100
        
    # 將樓層與停車位的使用率加進字典並轉成 json
    json_string = ""
    dic1 = {}
    dic2 = {'1':sum(time_stamp[0:20])/20, '2':sum(time_stamp[20:40])/20, '3':sum(time_stamp[40:60])/20, '4':sum(time_stamp[60:80])/20}
    for idx, value in enumerate(time_stamp):
        dic1["PS" + str(idx+1).zfill(3)] = value

    json_string = json.dumps(dic2)
    json_string += json.dumps(dic1)

    response = json_string
    return response,200,{"Content-Type":"application/json"}

@app.route('/get_reserve_info', methods=['GET'])
def get_reserve_info():
    '''
    3. /get_reserve_info (使用者查看預約的停車位資訊)
	參數: {user_id} 回傳: {expire_time, floor, number}
    '''
    user_id = request.args.get('user_id')

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
        # sql 現在找不到東西，有可能是DB假資料不夠，待改
        cursor = conn.cursor()
        sql =  "SELECT parking_space.floor, parking_space.number, record.reverse_time "
        sql += "FROM record "
        sql += "INNER JOIN parking_space ON record.parking_space_id = parking_space.parking_space_id "
        sql += "INNER JOIN parking_space_status ON record.parking_space_id = parking_space_status.parking_space_id"
        sql += "WHERE record.user_id = '" + user_id + " "
        sql += "AND parking_space_status = 1;"

        cursor.execute(sql)
        rows = cursor.fetchall()
        
        #Cleanup
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
            reverse_time = datetime.strptime(str(row[2]), '%Y-%m-%d %H:%M:%S')
            expired_time = reverse_time + timedelta(minutes=30)

            # 2023-04-01T05:00:30
            dic["expired_time"] = expired_time.isoformat(timespec='seconds')
            json_string += json.dumps(dic)

    # 回傳 json
    response = json_string
    return response,200,{"Content-Type":"application/json"}

@app.route('/get_car_info', methods=['GET'])
def get_car_info():
    '''
    4. /get_car_info 
	參數: {user_id} 回傳: parking_space_id
    '''

    user_id = request.args.get('user_id')

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
        sql =  "SELECT record.parking_space_id "
        sql += "FROM record  "
        sql += "WHERE record.user_id = '" + user_id + " "
        sql += "AND record.exit_time IS NULL;"

        cursor.execute(sql)
        rows = cursor.fetchall()
        
        #Cleanup
        conn.commit()
        cursor.close()
        conn.close()

    # 包成 json 回傳
    json_string = ""
    for row in rows:
        dic = {}
        dic["parking_space_id"] = row[0]
        json_string += json.dumps(dic)

    # 回傳 json
    response = json_string
    return response,200,{"Content-Type":"application/json"}
