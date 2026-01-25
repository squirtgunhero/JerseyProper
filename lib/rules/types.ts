export type RuleStatus = 'pass' | 'warn' | 'fail'

export type ModuleId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface RuleResult {
  id: string
  module: ModuleId
  title: string
  whyItMatters: string
  maxPoints: number
  earnedPoints: number
  status: RuleStatus
  evidence: string[]
  recommendation: string
}

export interface ModuleScore {
  id: ModuleId
  name: string
  maxPoints: number
  earnedPoints: number
  grade: string
  rules: RuleResult[]
}

export interface ScoringResult {
  overallScore: number
  maxScore: number
  modules: ModuleScore[]
  allRules: RuleResult[]
}
