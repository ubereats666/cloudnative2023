import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";

const Setting = () => {
  return (
    <>
      <div className="flex flex-col h-screen justify-between w-fit">
        <div className="flex flex-col gap-y-5">
          <h2 className="text-24 p-3">個人設定</h2>
          <Card variant="setting">
            <CardHeader>
              <CardTitle>車牌號碼</CardTitle>
            </CardHeader>
            <CardContent>
              <Input variant="setting" placeholder="ABC-1234" />
            </CardContent>
          </Card>
          <Card variant="setting">
            <CardHeader>
              <CardTitle>樓層偏好</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="2F">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2F" id="r1" variant="setting" />
                  <Label htmlFor="r1">2F</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1F" id="r2" variant="setting" />
                  <Label htmlFor="r2">1F</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="B1F" id="r3" variant="setting" />
                  <Label htmlFor="r3">B1F</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="B2F" id="r4" variant="setting" />
                  <Label htmlFor="r4">B2F</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-x-3 px-9 py-3">
          <Button variant="setting_outline" size="none"><p className="text-20">取消</p></Button>
          <Button variant="setting" size="none"><p className="text-20">儲存變更</p></Button>
        </div>
      </div>
    </>
  );
};

export default Setting;
