import { SimulationResult } from "@/types/experiment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  DollarSign, 
  Activity,
  Download,
  BarChart3
} from "lucide-react";
import { BREAK_EVEN_POINT } from "@/lib/experimentData";

interface ResultsDisplayProps {
  result: SimulationResult;
}

export const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const { participant_summary, daily_records } = result;
  const {
    participant_id,
    group,
    E_predicted,
    total_rides_count,
    E_minus_A_overconfidence,
    total_cost_incurred,
    final_cash_payoff,
    chosen_payment_plan
  } = participant_summary;

  const exportToCSV = () => {
    const headers = Object.keys(daily_records[0]).join(",");
    const rows = daily_records.map(record => 
      Object.values(record).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(",")
    );
    const csv = [headers, ...rows].join("\n");
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experiment_${participant_id}_data.csv`;
    a.click();
  };

  const getOverconfidenceStatus = () => {
    if (E_minus_A_overconfidence > 0) {
      return { 
        label: "过度自信", 
        color: "destructive",
        icon: AlertCircle,
        description: `高估了 ${E_minus_A_overconfidence} 次骑行`
      };
    } else if (E_minus_A_overconfidence < 0) {
      return { 
        label: "悲观估计", 
        color: "warning",
        icon: TrendingUp,
        description: `低估了 ${Math.abs(E_minus_A_overconfidence)} 次骑行`
      };
    } else {
      return { 
        label: "理性预测", 
        color: "success",
        icon: CheckCircle,
        description: "预期与实际完全一致"
      };
    }
  };

  const getPurchaseRationality = () => {
    if (chosen_payment_plan === 'A') {
      const expectedRational = E_predicted >= BREAK_EVEN_POINT;
      const actualRational = total_rides_count >= BREAK_EVEN_POINT;
      
      return {
        expected: expectedRational ? "理性选择" : "非理性选择",
        actual: actualRational ? "实际划算" : "实际损失",
        savings: actualRational ? 0 : (BREAK_EVEN_POINT - total_rides_count)
      };
    } else {
      const expectedRational = E_predicted < BREAK_EVEN_POINT;
      const actualRational = total_rides_count < BREAK_EVEN_POINT;
      
      return {
        expected: expectedRational ? "理性选择" : "次优选择",
        actual: actualRational ? "实际划算" : "实际损失",
        savings: actualRational ? 0 : (total_rides_count - BREAK_EVEN_POINT)
      };
    }
  };

  const status = getOverconfidenceStatus();
  const rationality = getPurchaseRationality();
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">实验结果分析</h2>
          <p className="text-muted-foreground">被试ID: {participant_id}</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          导出数据
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 shadow-[var(--shadow-card)] border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">预期骑行</p>
              <p className="text-3xl font-bold text-foreground">{E_predicted}</p>
              <p className="text-xs text-muted-foreground mt-1">次</p>
            </div>
            <Activity className="w-8 h-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6 shadow-[var(--shadow-card)] border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">实际骑行</p>
              <p className="text-3xl font-bold text-foreground">{total_rides_count}</p>
              <p className="text-xs text-muted-foreground mt-1">次</p>
            </div>
            <BarChart3 className="w-8 h-8 text-accent opacity-50" />
          </div>
        </Card>

        <Card className="p-6 shadow-[var(--shadow-card)] border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">总成本</p>
              <p className="text-3xl font-bold text-foreground">{total_cost_incurred}</p>
              <p className="text-xs text-muted-foreground mt-1">代币</p>
            </div>
            <DollarSign className="w-8 h-8 text-destructive opacity-50" />
          </div>
        </Card>

        <Card className="p-6 shadow-[var(--shadow-card)] border-border bg-gradient-to-br from-primary/5 to-primary-glow/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">最终收益</p>
              <p className="text-3xl font-bold text-primary">¥{final_cash_payoff.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">人民币</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-[var(--shadow-elevated)] border-border">
        <div className="flex items-center gap-2 mb-4">
          <StatusIcon className={`w-5 h-5 text-${status.color}`} />
          <h3 className="text-lg font-semibold text-foreground">过度自信分析 (H1)</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant={status.color as any} className="text-sm">
              {status.label}
            </Badge>
            <span className="text-sm text-muted-foreground">{status.description}</span>
          </div>
          <p className="text-sm text-foreground">
            {E_minus_A_overconfidence > 0 && 
              `您预期骑行 ${E_predicted} 次，但实际只骑行了 ${total_rides_count} 次，表现出过度自信偏差。这种高估可能导致您购买了不合适的套餐。`
            }
            {E_minus_A_overconfidence < 0 && 
              `您预期骑行 ${E_predicted} 次，但实际骑行了 ${total_rides_count} 次。您对自己的使用频率估计偏保守。`
            }
            {E_minus_A_overconfidence === 0 && 
              `您的预期骑行次数与实际次数完全一致，展现出很好的自我认知能力。`
            }
          </p>
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-elevated)] border-border">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">购买决策理性分析 (H2)</h3>
        </div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">基于预期</p>
              <Badge variant={rationality.expected.includes("理性") ? "success" : "destructive"}>
                {rationality.expected}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                盈亏平衡点: {BREAK_EVEN_POINT}次 | 您的预期: {E_predicted}次
              </p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">基于实际</p>
              <Badge variant={rationality.actual.includes("划算") ? "success" : "destructive"}>
                {rationality.actual}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                实际骑行: {total_rides_count}次
                {rationality.savings > 0 && ` | 可节省: ${rationality.savings}代币`}
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground">
            {chosen_payment_plan === 'A' 
              ? `您选择了套餐A (15代币)。${total_rides_count >= BREAK_EVEN_POINT 
                  ? '从实际使用来看，套餐是划算的选择。' 
                  : `实际只骑行了${total_rides_count}次，若选择按次付费可节省${BREAK_EVEN_POINT - total_rides_count}代币。`}`
              : `您选择了按次付费B。${total_rides_count < BREAK_EVEN_POINT 
                  ? '从实际使用来看，按次付费是更明智的选择。' 
                  : `实际骑行了${total_rides_count}次，若选择套餐可节省${total_rides_count - BREAK_EVEN_POINT}代币。`}`
            }
          </p>
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-elevated)] border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">实验机制洞察 (H3/H4)</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-0.5">组 {group}</Badge>
            <div>
              <p className="text-sm font-medium text-foreground">
                {group === 1 && "标准沉没成本环境"}
                {group === 2 && "成本可见环境"}
                {group === 3 && "即时成本环境"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {group === 1 && chosen_payment_plan === 'A' && 
                  <>您处于标准沉没成本环境。您的骑行决策可能受到"支付贬值效应"和"物尽其用"心理的推动。</>
                }
                {group === 2 && chosen_payment_plan === 'A' && 
                  <>您处于成本可见环境。每次骑行时系统提示分摊成本。本实验旨在观察这种提醒是否有效地削弱了沉没成本导致的过度使用。</>
                }
                {(group === 3 || chosen_payment_plan === 'B') && 
                  <>您处于即时成本环境。每次骑行都有即时成本反馈（1代币/次），您的行为倾向于更直接反映情境的真实需求。</>
                }
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)] border-border bg-accent/5">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">消费建议</h3>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {(chosen_payment_plan === 'A' && total_rides_count < BREAK_EVEN_POINT) || 
           (chosen_payment_plan === 'B' && total_rides_count >= BREAK_EVEN_POINT)
            ? <>在未来的套餐购买中，建议您基于保守且客观的需求来做决策。请警惕过度自信，并关注购买后产生的沉没成本心理压力。考虑您的实际使用频率和真实需求，而不是被"划算"的感觉所驱动。</>
            : <>您的预测和选择在本次模拟中是较为合理的。在实际生活中，请继续关注您真实的长期使用频率，保持理性的消费决策。</>
          }
        </p>
      </Card>
    </div>
  );
};
