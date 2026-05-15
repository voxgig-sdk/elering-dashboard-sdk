<?php
declare(strict_types=1);

// EleringDashboard SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

EleringDashboardUtility::setRegistrar(function (EleringDashboardUtility $u): void {
    $u->clean = [EleringDashboardClean::class, 'call'];
    $u->done = [EleringDashboardDone::class, 'call'];
    $u->make_error = [EleringDashboardMakeError::class, 'call'];
    $u->feature_add = [EleringDashboardFeatureAdd::class, 'call'];
    $u->feature_hook = [EleringDashboardFeatureHook::class, 'call'];
    $u->feature_init = [EleringDashboardFeatureInit::class, 'call'];
    $u->fetcher = [EleringDashboardFetcher::class, 'call'];
    $u->make_fetch_def = [EleringDashboardMakeFetchDef::class, 'call'];
    $u->make_context = [EleringDashboardMakeContext::class, 'call'];
    $u->make_options = [EleringDashboardMakeOptions::class, 'call'];
    $u->make_request = [EleringDashboardMakeRequest::class, 'call'];
    $u->make_response = [EleringDashboardMakeResponse::class, 'call'];
    $u->make_result = [EleringDashboardMakeResult::class, 'call'];
    $u->make_point = [EleringDashboardMakePoint::class, 'call'];
    $u->make_spec = [EleringDashboardMakeSpec::class, 'call'];
    $u->make_url = [EleringDashboardMakeUrl::class, 'call'];
    $u->param = [EleringDashboardParam::class, 'call'];
    $u->prepare_auth = [EleringDashboardPrepareAuth::class, 'call'];
    $u->prepare_body = [EleringDashboardPrepareBody::class, 'call'];
    $u->prepare_headers = [EleringDashboardPrepareHeaders::class, 'call'];
    $u->prepare_method = [EleringDashboardPrepareMethod::class, 'call'];
    $u->prepare_params = [EleringDashboardPrepareParams::class, 'call'];
    $u->prepare_path = [EleringDashboardPreparePath::class, 'call'];
    $u->prepare_query = [EleringDashboardPrepareQuery::class, 'call'];
    $u->result_basic = [EleringDashboardResultBasic::class, 'call'];
    $u->result_body = [EleringDashboardResultBody::class, 'call'];
    $u->result_headers = [EleringDashboardResultHeaders::class, 'call'];
    $u->transform_request = [EleringDashboardTransformRequest::class, 'call'];
    $u->transform_response = [EleringDashboardTransformResponse::class, 'call'];
});
