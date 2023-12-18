import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import updatePreference from "./updatePreference";

const Form = ({ userId, plate, floor, priority, setPlate, setFloor, toast, router }) => {
  const [changed, setChanged] = useState(false);

  const onUpdate = async () => {
    // TODO: confirm the floor index is correct
    console.log(plate, floor);

    const { isSuccess, message } = await updatePreference({ userId, plate, floor })
    console.log(isSuccess, message)

    if (isSuccess) {
      toast({
        description: "您的偏好已更新",
      });
      setChanged(false);
    } else {
      toast({
        variant: "destructive",
        description: "發生錯誤，請稍後再試",
      });
    }
  };

  return (
    <div className="flex flex-col w-full lg:w-fit justify-between">
      <div className="flex flex-col gap-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-24 p-3">個人設定</h2>
          {
            priority === 1
              ? <div className="px-4 py-1 bg-blue-100 rounded-full border-2 border-sky-600 text-sky-600">友善</div>
              : <div />
          }
        </div>
        <Card variant="setting">
          <CardHeader>
            <CardTitle>車牌號碼</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              variant="setting"
              value={plate}
              onChange={(e) => {
                setPlate(e.target.value);
                if (!changed) {
                  setChanged(true);
                }
              }}
            />
          </CardContent>
        </Card>
        <Card variant="setting">
          <CardHeader>
            <CardTitle>樓層偏好</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue={floor}
              onValueChange={(v) => {
                setFloor(v);
                if (!changed) {
                  setChanged(true);
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="4" variant="setting" />
                <Label htmlFor="4">2F</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="3" variant="setting" />
                <Label htmlFor="3">1F</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="2" variant="setting" />
                <Label htmlFor="2">B1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" variant="setting" />
                <Label htmlFor="1">B2</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center gap-x-3 px-9 py-3">
        <Button
          variant="setting_outline"
          size="none"
          onClick={() => router.back()}
        >
          <p className="text-20">取消</p>
        </Button>
        <Button
          variant="setting"
          size="none"
          disabled={!changed}
          onClick={onUpdate}
        >
          <p className="text-20">儲存變更</p>
        </Button>
      </div>
    </div>
  );
};

export default Form;
