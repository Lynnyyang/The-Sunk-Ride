import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SimulationParams } from "@/types/experiment";
import { Bike, User, TrendingUp, Cloud, Route, Clock, Package } from "lucide-react";

interface SimulationFormProps {
  onSubmit: (params: SimulationParams) => void;
  isLoading: boolean;
}

export const SimulationForm = ({ onSubmit, isLoading }: SimulationFormProps) => {
  const [participantId, setParticipantId] = useState("P001");
  const [group, setGroup] = useState<number>(1);
  const [ePredicted, setEPredicted] = useState<number>(12);
  const [paymentPlan, setPaymentPlan] = useState<string>("A");
  const [age, setAge] = useState<number>(22);
  const [gender, setGender] = useState<string>("Male");
  const [freqBikeUse, setFreqBikeUse] = useState<number>(3);
  
  const [weatherSensitivity, setWeatherSensitivity] = useState<number>(0.2);
  const [distanceSensitivity, setDistanceSensitivity] = useState<number>(0.1);
  const [pressureSensitivity, setPressureSensitivity] = useState<number>(0.3);
  const [sunkCostInfluence, setSunkCostInfluence] = useState<number>(0.15);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      participant_id: participantId,
      group,
      E_predicted: ePredicted,
      chosen_payment_plan: group === 3 ? 'B' : paymentPlan,
      age,
      gender,
      freq_bike_use: freqBikeUse,
      sensitivity_to_weather: weatherSensitivity,
      sensitivity_to_distance: distanceSensitivity,
      sensitivity_to_pressure: pressureSensitivity,
      sunk_cost_influence: sunkCostInfluence
    });
  };

  const getGroupDescription = (groupNum: number) => {
    const descriptions = {
      1: "标准套餐组 - 沉没成本效应",
      2: "成本可见组 - 每次显示分摊成本",
      3: "对照组 - 仅按次付费"
    };
    return descriptions[groupNum as keyof typeof descriptions];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 shadow-[var(--shadow-card)] border-border">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">被试基本信息</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="participantId">被试ID</Label>
            <Input
              id="participantId"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              placeholder="例如: P001"
              className="border-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">年龄</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={18}
              max={100}
              className="border-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">性别</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">男性</SelectItem>
                <SelectItem value="Female">女性</SelectItem>
                <SelectItem value="Other">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="freqBikeUse">骑行频率 (次/周)</Label>
            <Input
              id="freqBikeUse"
              type="number"
              value={freqBikeUse}
              onChange={(e) => setFreqBikeUse(Number(e.target.value))}
              min={0}
              max={7}
              className="border-input"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border">
        <div className="flex items-center gap-2 mb-4">
          <Bike className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">实验设置</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="group">实验组别</Label>
            <Select value={group.toString()} onValueChange={(val) => setGroup(Number(val))}>
              <SelectTrigger className="border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">组 1 - 标准套餐组</SelectItem>
                <SelectItem value="2">组 2 - 成本可见组</SelectItem>
                <SelectItem value="3">组 3 - 对照组</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {getGroupDescription(group)}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ePredicted">预期骑行天数 (E)</Label>
            <div className="flex items-center gap-3">
              <Input
                id="ePredicted"
                type="number"
                value={ePredicted}
                onChange={(e) => setEPredicted(Number(e.target.value))}
                min={0}
                max={20}
                className="border-input w-20"
              />
              <Slider
                value={[ePredicted]}
                onValueChange={(val) => setEPredicted(val[0])}
                max={20}
                step={1}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              盈亏平衡点: 15次 | 您的预期: {ePredicted}次
            </p>
          </div>
          
          {group !== 3 && (
            <div className="space-y-2">
              <Label htmlFor="paymentPlan">支付方案</Label>
              <Select value={paymentPlan} onValueChange={setPaymentPlan}>
                <SelectTrigger className="border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">方案 A - 套餐 (15代币)</SelectItem>
                  <SelectItem value="B">方案 B - 按次付费 (1代币/次)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">心理偏好参数</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-muted-foreground" />
                天气敏感度
              </Label>
              <span className="text-sm font-medium text-foreground">{weatherSensitivity.toFixed(2)}</span>
            </div>
            <Slider
              value={[weatherSensitivity]}
              onValueChange={(val) => setWeatherSensitivity(val[0])}
              max={1}
              step={0.05}
            />
            <p className="text-xs text-muted-foreground">恶劣天气情景的惩罚系数</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Route className="w-4 h-4 text-muted-foreground" />
                距离敏感度
              </Label>
              <span className="text-sm font-medium text-foreground">{distanceSensitivity.toFixed(2)}</span>
            </div>
            <Slider
              value={[distanceSensitivity]}
              onValueChange={(val) => setDistanceSensitivity(val[0])}
              max={1}
              step={0.05}
            />
            <p className="text-xs text-muted-foreground">长距离情景的惩罚系数 (≥4km)</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                时间压力敏感度
              </Label>
              <span className="text-sm font-medium text-foreground">{pressureSensitivity.toFixed(2)}</span>
            </div>
            <Slider
              value={[pressureSensitivity]}
              onValueChange={(val) => setPressureSensitivity(val[0])}
              max={1}
              step={0.05}
            />
            <p className="text-xs text-muted-foreground">高时间压力情景的奖励系数</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                沉没成本影响
              </Label>
              <span className="text-sm font-medium text-foreground">{sunkCostInfluence.toFixed(2)}</span>
            </div>
            <Slider
              value={[sunkCostInfluence]}
              onValueChange={(val) => setSunkCostInfluence(val[0])}
              max={1}
              step={0.05}
            />
            <p className="text-xs text-muted-foreground">购买套餐后的额外骑行倾向</p>
          </div>
        </div>
      </Card>

      <Button 
        type="submit" 
        size="lg"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-[var(--shadow-elevated)]"
      >
        {isLoading ? "模拟运行中..." : "开始模拟实验"}
      </Button>
    </form>
  );
};
