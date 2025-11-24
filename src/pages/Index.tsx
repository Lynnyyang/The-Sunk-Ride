import { useState } from "react";
import { SimulationForm } from "@/components/SimulationForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { SimulationParams, SimulationResult } from "@/types/experiment";
import { runFullExperimentSimulation } from "@/lib/simulationEngine";
import { toast } from "sonner";
import { Bike, FlaskConical } from "lucide-react";

const Index = () => {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulation = (params: SimulationParams) => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const simulationResult = runFullExperimentSimulation(params);
        setResult(simulationResult);
        toast.success("模拟完成！", {
          description: `成功生成被试 ${params.participant_id} 的20天实验数据`
        });
      } catch (error) {
        toast.error("模拟失败", {
          description: error instanceof Error ? error.message : "未知错误"
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-primary-glow rounded-2xl shadow-[var(--shadow-elevated)]">
              <Bike className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              共享单车实验模拟器
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            基于行为经济学的沉没成本效应研究 · 交互式数据生成与分析工具
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>H1: 过度自信</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>H2: 购买理性</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>H3/H4: 沉没成本</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <SimulationForm onSubmit={handleSimulation} isLoading={isLoading} />
          </div>
          
          <div className="lg:col-span-3">
            {result ? (
              <ResultsDisplay result={result} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 p-12">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
                    <Bike className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">准备开始实验</h3>
                  <p className="text-muted-foreground max-w-md">
                    请在左侧填写被试信息和实验参数，点击"开始模拟实验"按钮生成20天的骑行决策数据。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 共享单车实验模拟器 · 用于行为经济学研究与教学</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
