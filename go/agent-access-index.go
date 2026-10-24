package voxgigagentaccessindexsdk

import (
	"github.com/voxgig-sdk/agent-access-index-sdk/go/core"
	"github.com/voxgig-sdk/agent-access-index-sdk/go/entity"
	"github.com/voxgig-sdk/agent-access-index-sdk/go/feature"
	_ "github.com/voxgig-sdk/agent-access-index-sdk/go/utility"
)

// Type aliases preserve external API.
type AgentAccessIndexSDK = core.AgentAccessIndexSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AgentAccessIndexEntity = core.AgentAccessIndexEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AgentAccessIndexError = core.AgentAccessIndexError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewDatasetEntityFunc = func(client *core.AgentAccessIndexSDK, entopts map[string]any) core.AgentAccessIndexEntity {
		return entity.NewDatasetEntity(client, entopts)
	}
	core.NewIndexStatEntityFunc = func(client *core.AgentAccessIndexSDK, entopts map[string]any) core.AgentAccessIndexEntity {
		return entity.NewIndexStatEntity(client, entopts)
	}
	core.NewLabEntityFunc = func(client *core.AgentAccessIndexSDK, entopts map[string]any) core.AgentAccessIndexEntity {
		return entity.NewLabEntity(client, entopts)
	}
	core.NewShelfEntityFunc = func(client *core.AgentAccessIndexSDK, entopts map[string]any) core.AgentAccessIndexEntity {
		return entity.NewShelfEntity(client, entopts)
	}
	core.NewTrafficEntityFunc = func(client *core.AgentAccessIndexSDK, entopts map[string]any) core.AgentAccessIndexEntity {
		return entity.NewTrafficEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAgentAccessIndexSDK = core.NewAgentAccessIndexSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAgentAccessIndexSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AgentAccessIndexSDK  { return NewAgentAccessIndexSDK(nil) }
func Test() *AgentAccessIndexSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
