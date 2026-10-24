package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDatasetEntityFunc func(client *AgentAccessIndexSDK, entopts map[string]any) AgentAccessIndexEntity

var NewIndexStatEntityFunc func(client *AgentAccessIndexSDK, entopts map[string]any) AgentAccessIndexEntity

var NewLabEntityFunc func(client *AgentAccessIndexSDK, entopts map[string]any) AgentAccessIndexEntity

var NewShelfEntityFunc func(client *AgentAccessIndexSDK, entopts map[string]any) AgentAccessIndexEntity

var NewTrafficEntityFunc func(client *AgentAccessIndexSDK, entopts map[string]any) AgentAccessIndexEntity

