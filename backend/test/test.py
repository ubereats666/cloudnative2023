# test_app.py
import unittest
from app import app
import json

class TestApp(unittest.TestCase):

    def setUp(self):
        # 建立一個測試用的 Flask client
        self.app = app.test_client()

    def test_get_abnormal_space(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_empty_parking_space')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)

    def test_get_space_usage_rate(self):
        # 使用 Flask client 發送 GET 請求，傳入參數 '2023-11-22'
        response = self.app.get('/get_space_usage_rate?date=2023-12-15')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)

        # 將 API 回傳的 JSON 字串轉換成 Python 對象
        data = json.loads(response.get_data(as_text=True))

        # 在這裡檢查 API 回傳的內容是否符合預期
        # 假設你的 JSON 格式如下，可以使用 self.assertEqual 進行斷言
        expected_data = {
            'get_space_usage_rate': [
                {"floor": "all", "occupied": 9.982754430028125e-06, "vacant": 0.33},
                {"floor": "2F", "occupied": 0.0, "vacant": 1.0},
                {"floor": "1F", "occupied": 3.99310177201125e-05, "vacant": 0.9999600689822798},
                {"floor": "B1", "occupied": 0.0, "vacant": 1.0},
                {"floor": "B2", "occupied": 0.0, "vacant": 1.0}
            ]
        }

        for i, item in enumerate(data['get_space_usage_rate']):
            self.assertAlmostEqual(json.loads(item)['occupied'] , expected_data['get_space_usage_rate'][i]['occupied'], places=5)
    
    def test_get_user_info(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_user_info?user_id=10')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)
    
    def test_get_empty_parking_space(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_empty_parking_space')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)

    def test_get_reserve_info(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_reserve_info?user_id=10')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)

    def test_get_car_info(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_car_info?user_id=10')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)

    def test_get_space_history(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_space_history?date=2023-12-15&parking_space_id=2F13')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)

    def test_get_space_usage_rate(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_space_usage_rate?date=2023-12-15')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)

    def test_get_abnormal_space(self):
        # 使用 Flask client 發送 GET 請求
        response = self.app.get('/get_abnormal_space')

        # 確認 HTTP 狀態碼是否為 200
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
