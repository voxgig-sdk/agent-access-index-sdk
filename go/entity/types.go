// Typed models for the AgentAccessIndex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/agent-access-index-sdk/go/core"
)

// Dataset is the typed data model for the dataset entity.
type Dataset struct {
}

// DatasetListMatch is the typed request payload for Dataset.ListTyped.
type DatasetListMatch struct {
	AgentCanRegister *string `json:"agent_can_register,omitempty"`
	AgentReports *map[string]any `json:"agent_reports,omitempty"`
	Answer *string `json:"answer,omitempty"`
	CheckedAt *string `json:"checked_at,omitempty"`
	Error *string `json:"error,omitempty"`
	Family *string `json:"family,omitempty"`
	FamilyTitle *string `json:"family_title,omitempty"`
	FinalUrl *string `json:"final_url,omitempty"`
	Fingerprint *string `json:"fingerprint,omitempty"`
	FirstPassGate *string `json:"first_pass_gate,omitempty"`
	FrontDoor *map[string]any `json:"front_door,omitempty"`
	Gate *string `json:"gate,omitempty"`
	GateLabel *string `json:"gate_label,omitempty"`
	HttpStatus *int `json:"http_status,omitempty"`
	Id *string `json:"id,omitempty"`
	Manual *map[string]any `json:"manual,omitempty"`
	Name *string `json:"name,omitempty"`
	Note *string `json:"note,omitempty"`
	Page *string `json:"page,omitempty"`
	PageTitle *string `json:"page_title,omitempty"`
	Question *string `json:"question,omitempty"`
	ReeseAccount *map[string]any `json:"reese_account,omitempty"`
	Research *map[string]any `json:"research,omitempty"`
	RulesMentions *map[string]any `json:"rules_mentions,omitempty"`
	RulesPages *[]any `json:"rules_pages,omitempty"`
	RulesQuotes *[]any `json:"rules_quotes,omitempty"`
	SignupUrl *string `json:"signup_url,omitempty"`
	Stepped *[]any `json:"stepped,omitempty"`
	Tone *string `json:"tone,omitempty"`
}

// IndexStat is the typed data model for the index_stat entity.
type IndexStat struct {
}

// IndexStatLoadMatch is the typed request payload for IndexStat.LoadTyped.
type IndexStatLoadMatch struct {
	ByFamily *map[string]any `json:"by_family,omitempty"`
	ByGate *map[string]any `json:"by_gate,omitempty"`
	Note *string `json:"note,omitempty"`
	Shelves *int `json:"shelves,omitempty"`
}

// Lab is the typed data model for the lab entity.
type Lab struct {
}

// LabListMatch is the typed request payload for Lab.ListTyped.
type LabListMatch struct {
	Before *[]any `json:"before,omitempty"`
	Experiments *[]any `json:"experiments,omitempty"`
	Updated *string `json:"updated,omitempty"`
}

// Shelf is the typed data model for the shelf entity.
type Shelf struct {
}

// ShelfLoadMatch is the typed request payload for Shelf.LoadTyped.
type ShelfLoadMatch struct {
	Id string `json:"id"`
}

// ShelfListMatch is the typed request payload for Shelf.ListTyped.
type ShelfListMatch struct {
	AgentCanRegister *string `json:"agent_can_register,omitempty"`
	Family *string `json:"family,omitempty"`
}

// Traffic is the typed data model for the traffic entity.
type Traffic struct {
}

// TrafficListMatch is the typed request payload for Traffic.ListTyped.
type TrafficListMatch struct {
	Day *int `json:"day,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
