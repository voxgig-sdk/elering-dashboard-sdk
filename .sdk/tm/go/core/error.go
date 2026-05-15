package core

type EleringDashboardError struct {
	IsEleringDashboardError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEleringDashboardError(code string, msg string, ctx *Context) *EleringDashboardError {
	return &EleringDashboardError{
		IsEleringDashboardError: true,
		Sdk:              "EleringDashboard",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EleringDashboardError) Error() string {
	return e.Msg
}
