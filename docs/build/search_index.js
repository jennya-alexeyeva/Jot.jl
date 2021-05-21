var documenterSearchIndex = {"docs":
[{"location":"Types.html#Types","page":"Types","title":"Types","text":"","category":"section"},{"location":"Types.html","page":"Types","title":"Types","text":"AbstractResponder\nAWSConfig\nContainer\nLambdaFunction\nLocalImage\nLocalPackageResponder\nRemoteImage","category":"page"},{"location":"Types.html#Jot.AbstractResponder","page":"Types","title":"Jot.AbstractResponder","text":"abstract type AbstractResponder{IT} end\n\nThe supertype of all responder types. The type parameter represents the parameter type of the  response_function responder attribute.\n\n\n\n\n\n","category":"type"},{"location":"Types.html#Jot.AWSConfig","page":"Types","title":"Jot.AWSConfig","text":"mutable struct AWSConfig\n    account_id::Union{Missing, String} = missing\n    region::Union{Missing, String} = missing\nend\n\nDefines the Amazon Web Services account id and region to use.\n\nYour current AWS CLI profile should match the account id specified here. To check that this is the case, run aws sts get-caller-identity --query Account --output text from the command line. To  see available profiles, run aws configure list-profiles.\n\n\n\n\n\n","category":"type"},{"location":"Types.html#Jot.Container","page":"Types","title":"Jot.Container","text":"mutable struct Container\n    ID::String\n    Image::String\n    Command::Union{Missing, String} = missing\n    CreatedAt::Union{Missing, String} = missing\n    Names::Union{Missing, String} = missing\n    Ports::Union{Missing, String} = missing\n    exists::Bool = true\nend\n\nRepresents a docker container on the local environment. Should not be instantiated directly. If  exists is true, then the container is assumed to exit and so should be visible from utilities  such as docker container ls --all.\n\n\n\n\n\n","category":"type"},{"location":"Types.html#Jot.LambdaFunction","page":"Types","title":"Jot.LambdaFunction","text":"@with_kw mutable struct LambdaFunction\n    FunctionName::Union{Missing, String} = missing\n    FunctionArn::Union{Missing, String} = missing\n    Runtime::Union{Missing, String} = missing\n    Role::Union{Missing, String} = missing\n    Handler::Union{Missing, String} = missing\n    CodeSize::Union{Missing, Int64} = missing\n    Description::Union{Missing, String} = missing\n    Timeout::Union{Missing, Int64} = missing\n    MemorySize::Union{Missing, Int64} = missing\n    LastModified::Union{Missing, String} = missing\n    CodeSha256::Union{Missing, String} = missing\n    Version::Union{Missing, String} = missing\n    TracingConfig::Union{Missing, Dict{String, Any}} = missing\n    RevisionId::Union{Missing, String} = missing\n    PackageType::Union{Missing, String} = missing\n    exists::Bool = true\nend\n\nRepresents a Lambda function, hosted on AWS. Should not be instantiated directly. If exists is  true, then the image is assumed to exit and so should be visible from utilities such as aws  lambda list-functions\n\n\n\n\n\n","category":"type"},{"location":"Types.html#Jot.LocalImage","page":"Types","title":"Jot.LocalImage","text":"mutable struct LocalImage\n    CreatedAt::Union{Missing, String} = missing\n    Digest::String\n    ID::String\n    Repository::String\n    Size::Union{Missing, String} = missing\n    Tag::String\n    exists::Bool = true\nend\n\nRepresents a docker image on the local machine, and stores associated metadata. Should not be  instantiated directly. If exists is true, then the image is assumed to exit and so should be  visible from utilities such as docker image ls.\n\n\n\n\n\n","category":"type"},{"location":"Types.html#Jot.LocalPackageResponder","page":"Types","title":"Jot.LocalPackageResponder","text":"struct LocalPackageResponder{IT} <: AbstractResponder{IT}\n    pkg::Pkg.Types.PackageSpec\n    response_function::Symbol\n    response_function_param_type::Type{IT}\n    build_dir::String\n    package_name::String\nend\n\nA responder that is located locally (in the temporary build_dir) and is a Julia package. This is usually created by the Responder function.\n\n\n\n\n\n","category":"type"},{"location":"Types.html#Jot.RemoteImage","page":"Types","title":"Jot.RemoteImage","text":"@with_kw mutable struct RemoteImage\n    imageDigest::Union{Missing, String} = missing\n    imageTag::Union{Missing, String} = missing\n    ecr_repo::Union{Missing, ECRRepo} = missing\n    exists::Bool = true\nend\n\nRepresents a docker image stored in an AWS ECR Repository. The exists attribute indicates whether the RemoteImage still exists.\n\n\n\n\n\n","category":"type"},{"location":"Guide.html#Guide","page":"Guide","title":"Guide","text":"","category":"section"},{"location":"Guide.html#Installation","page":"Guide","title":"Installation","text":"","category":"section"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"From the Julia REPL, type ] to enter the Pkg REPL mode, then","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"Pkg.add(\"https://github.com/harris-chris/Jot.jl#master\"","category":"page"},{"location":"Guide.html#Background","page":"Guide","title":"Background","text":"","category":"section"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"Julia is not natively supported language on AWS Lambda. However, a given Julia function can still be used on AWS Lambda by building it into a Docker container, then have that container implement AWS's Lambda API. ","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"Jot uses a four-step process to go from a given block of Julia code, to a working Lambda function. Each step of this process is represented by a different type in Jot. This process is necessarily linear and although the process can be elided, no stage can actually be skipped:","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"Responder -> LocalImage -> RemoteImage -> LambdaFunction","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"A Responder is our chosen code for responding to Lambda Function calls. It can be as simple as a single function in a short Julia script, or it can be a fully-developed package with multiple dependencies.","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"A LocalImage is a locally-hosted docker image that has Julia installed, and the Responder added and available. A LocalImage is unique by both - in Docker vernacular - its Repository and its Tag. Therefore different versions/tags of the same basic image will be represented by different LocalImages. It also has the Jot.jl package itself installed. Jot.jl hosts the Responder, handling HTTP routing and JSON conversion. Additionally, the LocalImage has AWS RIE installed, a utility provided by AWS that emulates the Lambda run-time environment and so enables local testing of the function.","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"The RemoteImage represents the LocalImage, after it has been uploaded to AWS ECR. All RemoteImages must be stored in an ECR Repo. This repo maps to the image Repository. A repo may therefore contain multiple versions/tags for the same Repository; therefore multiple RemoteImages that share a Repository may be stored in the same ECR Repo.","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"A LambdaFunction is the final stage in the process and represents a working Lambda function, powered by a single RemoteImage.","category":"page"},{"location":"Guide.html#Best-practices","page":"Guide","title":"Best practices","text":"","category":"section"},{"location":"Guide.html#Using-PacakgeCompiler.jl","page":"Guide","title":"Using PacakgeCompiler.jl","text":"","category":"section"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"PackageCompiler.jl is a Julia package that pre-compiles methods. This can be done during the image creation process, and the create_local_image function has a package_compile option (default false) to indicate whether this should be used. Setting package_compile to true is highly recommended for production use; it eliminates almost all of the usual delay while Julia starts up, and so reduces Lambda Function cold start-up times by around 75%, making it competitive with any other language used for AWS Lambda.","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"PackageCompiler.jl works best when it is given some kind of sample use case; this tells it which methods it should be pre-compiling. By default, this use case involves calling the Responder with an empty string as the argument. However, if you are using a package as a responder, and this package has a test suite, then this will also be used as part of the use case, further improving performance. Jot.jl assumes that the test suite can be found at the standard location of <package base>/test/runtests.jl.","category":"page"},{"location":"Guide.html#Working-around-the-one-function-per-container-limit","page":"Guide","title":"Working around the one-function-per-container limit","text":"","category":"section"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"The Lambda API limits you to one function per container. In practice, dividing up all your functions into different containers is not practical. Instead, have the responding function expect a Dict, then use one of the fields of the dict to indicate the function that should be called. The responding function can then just forward the other parameters to the appropriate function. ","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"So instead of creating one responder to do addition: function add_response_function(a::Number, b::Number) a + b end","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"and another to do subtraction: function subtract_response_function(a::Number, b::Number) a - b end","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"then having these as separate images, create a single responding function:","category":"page"},{"location":"Guide.html","page":"Guide","title":"Guide","text":"function arithmetic_response(f::String, a::Number, b::Number) \n    if f == \"add\" a + b \n    elseif f == \"subtract\" a - b\n    else error(\"Unable to recognize desired function\")\n    end\nend","category":"page"},{"location":"Examples.html#Jot-Usage-Examples","page":"Examples","title":"Jot Usage Examples","text":"","category":"section"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"These examples assume there is an AWSRole called aws_role in scope.","category":"page"},{"location":"Examples.html#To-make-a-simple-script-into-a-Lambda-function...","page":"Examples","title":"To make a simple script into a Lambda function...","text":"","category":"section"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"... where the script is located at /path/to/script.jl, and contains a function called response_func, that takes a single argument of type Dict:","category":"page"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"ex1_responder = get_responder(\"/path/to/script.jl\", :response_func, Dict)\nex1_local_image = create_local_image(\"ex1\", ex1_responder)\n(_, ex1_remote_image) = push_to_ecr!(ex1_local_image)\nex1_lambda = create_lambda_function(ex1_remote_image, aws_role)","category":"page"},{"location":"Examples.html#To-make-a-script-with-dependencies-into-a-Lambda-function...","page":"Examples","title":"To make a script with dependencies into a Lambda function...","text":"","category":"section"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"... where the script is located at /path/to/script.jl, and contains a function called response_func, that takes a single argument of type Dict. The script uses the SpecialFunctions.jl package:","category":"page"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"ex2_responder = get_responder(\"/path/to/script.jl\", :response_func, Dict)\nex2_local_image = create_local_image(\"ex2\", ex2_responder; dependencies=[\"SpecialFunctions\"])\n(_, ex2_remote_image) = push_to_ecr!(ex2_local_image)\nex1_lambda = create_lambda_function(ex2_remote_image, aws_role)","category":"page"},{"location":"Examples.html#To-make-a-package-into-a-Lambda-function,-using-PackageCompiler-to-reduce-its-cold-start-time...","page":"Examples","title":"To make a package into a Lambda function, using PackageCompiler to reduce its cold start time...","text":"","category":"section"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"... where the package root (containing the Project.toml) is /path/to/project, and the package contains a function called response_func, that takes a single argument of type Vector{T} where {T <: Number}:","category":"page"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"ex3_responder = get_responder(\"/path/to/project\", :response_func, Vector)\nex3_local_image = create_local_image(\"ex3\", ex3_responder; package_compile=true)\n(_, ex3_remote_image) = push_to_ecr!(ex3_local_image)\nex3_lambda = create_lambda_function(ex3_remote_image, aws_role)","category":"page"},{"location":"Examples.html#To-make-a-package-in-scope-into-a-Responder...","page":"Examples","title":"To make a package in scope into a Responder...","text":"","category":"section"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"... where the package contains a function called response_func, that takes a single argument of type Vector{Int64}:","category":"page"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"using IntVectorResponder\nex4_responder = get_responder(IntVectorResponder, :response_func, Vector{Int64})","category":"page"},{"location":"Examples.html#To-make-a-package-into-a-local-docker-image,-and-test-it...","page":"Examples","title":"To make a package into a local docker image, and test it...","text":"","category":"section"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"... where the package root (containing the Project.toml) is /path/to/project, and the package contains a function called response_func, that takes a single argument of type String and appends \" Responded\" to the end of it:","category":"page"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"ex5_responder = get_responder(\"/path/to/project\", :response_func, String)\nex5_local_image = create_local_image(\"ex5\", ex5_responder)\nrun_test(ex5_local_image, \"test\", \"test Responded\")","category":"page"},{"location":"Examples.html#To-see-if-a-local-docker-image-has-the-same-function-as-a-remote-image...","page":"Examples","title":"To see if a local docker image has the same function as a remote image...","text":"","category":"section"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"... where localimage is a local docker image, and remoteimage is hosted on AWS ECR; the matches function checks that the underlying code of the local image and the remote image match:","category":"page"},{"location":"Examples.html","page":"Examples","title":"Examples","text":"matches(local_image, remote_image)","category":"page"},{"location":"Functions.html#Functions","page":"Functions","title":"Functions","text":"","category":"section"},{"location":"Functions.html","page":"Functions","title":"Functions","text":"create_lambda_function(\n    remote_image::RemoteImage,\n    role::AWSRole;\n    function_name::Union{Nothing, String} = nothing,\n    timeout::Int64 = 60,\n    memory_size::Int64 = 2000,\n  )\ncreate_lambda_function(\n    repo::ECRRepo,\n    role::AWSRole;\n    function_name::Union{Nothing, String} = nothing,\n    image_tag::String = \"latest\",\n    timeout::Int64 = 60,\n    memory_size::Int64 = 2000,\n  )\ncreate_local_image(\n    image_suffix::String,\n    responder::AbstractResponder;\n    aws_config::Union{Nothing, AWSConfig} = nothing, \n    image_tag::String = \"latest\",\n    no_cache::Bool = false,\n    julia_base_version::String = \"1.6.1\",\n    julia_cpu_target::String = \"x86-64\",\n    package_compile::Bool = false,\n  )\ndelete_container!(con::Container)\ndelete_ecr_repo!(repo::ECRRepo)\ndelete_lambda_function!(func::LambdaFunction)\ndelete_local_image!(image::LocalImage; force::Bool=false)\nget_dockerfile(\n    responder::AbstractResponder,\n    julia_base_version::String,\n    package_compile::Bool,\n  )\nget_ecr_repo(image::LocalImage)\nget_ecr_repo(repo_name::String)\nget_lambda_function(function_name::String)\nget_lambda_function(repo::ECRRepo)\nget_local_image(repository::String)\nget_remote_image(lambda_function::LambdaFunction)\nget_remote_image(local_image::LocalImage)\nget_responder( \n    path_url::String, \n    response_function::Symbol,\n    response_function_param_type::Type;\n    dependencies = Vector{String}(),\n  )\nget_responder(\n    package_spec::Pkg.Types.PackageSpec, \n    response_function::Symbol,\n    response_function_param_type::Type;\n    dependencies = Vector{String}(),\n  )\nget_responder(\n    mod::Module, \n    response_function::Symbol,\n    response_function_param_type::Type,\n  )\ninvoke_function(\n    request::Any,\n    lambda_function::LambdaFunction;\n    check_state::Bool,\n  )\nis_container_running(con::Container)\npush_to_ecr!(image::LocalImage)\nrun_image_locally(local_image::LocalImage; detached::Bool=true)\nrun_test(\n  image::LocalImage,\n  function_argument::Any = \"\", \n  expected_response::Any = nothing;\n  then_stop::Bool = false,\n)\nsend_local_request(request::Any)\nstop_container(con::Container)","category":"page"},{"location":"Functions.html#Jot.create_lambda_function-Tuple{RemoteImage, AWSRole}","page":"Functions","title":"Jot.create_lambda_function","text":"create_lambda_function(\n    remote_image::RemoteImage,\n    role::AWSRole;\n    function_name::Union{Nothing, String} = nothing,\n    timeout::Int64 = 60,\n    memory_size::Int64 = 2000,\n  )::LambdaFunction\n\nCreates a function that exists on the AWS Lambda service. The function will use the given  RemoteImage, and runs using the given AWS Role. \n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.create_lambda_function-Tuple{ECRRepo, AWSRole}","page":"Functions","title":"Jot.create_lambda_function","text":"create_lambda_function(\n    repo::ECRRepo,\n    role::AWSRole;\n    function_name::Union{Nothing, String} = nothing,\n    image_tag::String = \"latest\",\n    timeout::Int64 = 60,\n    memory_size::Int64 = 2000,\n  )::LambdaFunction\n\nCreates a function that exists on the AWS Lambda service. The function will use the given ECR Repo, and runs using the given AWS Role. If given, the image_tag will decide which of the images in the  ECR Repo is used.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.create_local_image-Tuple{String, AbstractResponder}","page":"Functions","title":"Jot.create_local_image","text":"create_local_image(\n    image_suffix::String,\n    responder::AbstractResponder;\n    aws_config::Union{Nothing, AWSConfig} = nothing, \n    image_tag::String = \"latest\",\n    no_cache::Bool = false,\n    julia_base_version::String = \"1.6.1\",\n    julia_cpu_target::String = \"x86-64\",\n    package_compile::Bool = false,\n  )::LocalImage\n\nCreates a locally-stored docker image containing the specified responder. This can be tested tested locally, or directly uploaded to an AWS ECR Repo for use as an AWS Lambda function.\n\npackage_compile indicates whether PackageCompiler.jl should be used to compile the image -  this is not necessarily for testing/exploration but is highly recommended for production use.\n\nUse no_cache to construct the local image without using a cache; this is sometimes necessary if nothing locally has changed, but the image is querying a remote object (say, a github repo) which has changed.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.delete_container!-Tuple{Container}","page":"Functions","title":"Jot.delete_container!","text":"delete_container!(con::Container)\n\nDeletes the passed container from the local docker system. The Container instance continues to  exist, but has its exists attribute set to false.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.delete_ecr_repo!-Tuple{ECRRepo}","page":"Functions","title":"Jot.delete_ecr_repo!","text":"delete_ecr_repo!(repo::ECRRepo)\n\nRemoves the passed ECRRepo instance from AWS ECR, and sets the exists attribute to false to indicate it no longer exists.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.delete_lambda_function!-Tuple{LambdaFunction}","page":"Functions","title":"Jot.delete_lambda_function!","text":"delete_lambda_function!(func::LambdaFunction)\n\nDeletes a Lambda function hosted on AWS. The LambdaFunction instance continues to exist, but has its exists attribute set to false.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.delete_local_image!-Tuple{LocalImage}","page":"Functions","title":"Jot.delete_local_image!","text":"delete_local_image!(\n  image::LocalImage; \n  force::Bool=false,\n)\n\nDeletes a locally-stored docker image. The LocalImage instance continues to exist, but has its exists attribute set to false.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_dockerfile-Tuple{AbstractResponder, String, Bool}","page":"Functions","title":"Jot.get_dockerfile","text":"get_dockerfile(\n    responder::AbstractResponder,\n    julia_base_version::String,\n    package_compile::Bool,\n  )::String\n\nReturns contents for a Dockerfile. This function is called in create_local_image in order to create a local docker image.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_ecr_repo-Tuple{LocalImage}","page":"Functions","title":"Jot.get_ecr_repo","text":"get_ecr_repo(image::LocalImage)::Union{Nothing, ECRRepo}\n\nQueries AWS and returns an ECRRepo instance that is associated with the passed local_image. Returns nothing if one cannot be found.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_ecr_repo-Tuple{String}","page":"Functions","title":"Jot.get_ecr_repo","text":"get_ecr_repo(repo_name::String)::Union{Nothing, ECRRepo}\n\nQueries AWS and returns an ECRRepo instance with the passed repo_name. Returns nothing if one cannot be found.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_lambda_function-Tuple{String}","page":"Functions","title":"Jot.get_lambda_function","text":"get_lambda_function(function_name::String)::Union{Nothing, LambdaFunction}\n\nQueries AWS and returns a LambdaFunction object, representing a Lambda Function hosted on AWS.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_lambda_function-Tuple{ECRRepo}","page":"Functions","title":"Jot.get_lambda_function","text":"get_lambda_function(repo::ECRRepo)::Union{Nothing, LambdaFunction}\n\nQueries AWS and returns a LambdaFunction object, representing a Lambda Function hosted on AWS.  The Lambda function returned is based off the given ECRRepo instance.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_local_image-Tuple{String}","page":"Functions","title":"Jot.get_local_image","text":"get_local_image(\n  repository::String,\n)::Union{Nothing, LocalImage}\n\nReturns a LocalImage object, representing a locally-stored docker image.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_remote_image-Tuple{LambdaFunction}","page":"Functions","title":"Jot.get_remote_image","text":"get_remote_image(lambda_function::LambdaFunction)::RemoteImage\n\nQueries AWS and returns a RemoteImage object, representing a docker image hosted on AWS ECR.  The RemoteImage returned provides the code for the provided lambda_function.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_remote_image-Tuple{LocalImage}","page":"Functions","title":"Jot.get_remote_image","text":"get_remote_image(local_image::LocalImage)::Union{Nothing, RemoteImage}\n\nQueries AWS and returns a RemoteImage instance corresponding to the given local_image. If none  exists, returns nothing.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_responder-Tuple{String, Symbol, Type}","page":"Functions","title":"Jot.get_responder","text":"function get_responder(\n    path_url::String, \n    response_function::Symbol,\n    response_function_param_type::Type{IT};\n    dependencies = Vector{String}(),\n  )::AbstractResponder{IT} where {IT}\n\nReturns an AbstractResponder, a type that holds the function that will be used to respond to AWS Lambda calls. \n\npath_url may point to either a script or a package. If a script, dependencies  may be passed to specify any dependencies used in the script. If a package, the dependencies will be found automatically from its Project.toml.\n\nresponse_function is a function within this module that you would like to use to respond to AWS  Lambda calls. response_function_param_type specifies the type that the response function is  expecting as its only argument.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_responder-Tuple{Pkg.Types.PackageSpec, Symbol, Type}","page":"Functions","title":"Jot.get_responder","text":"function get_responder(\n    package_spec::Pkg.Types.PackageSpec, \n    response_function::Symbol,\n    response_function_param_type::Type{IT};\n    dependencies = Vector{String}(),\n  )::AbstractResponder{IT} where {IT}\n\nReturns an AbstractResponder, a type that holds the function that will be used to respond to AWS Lambda calls.  \n\npackage_spec is an instance of PackageSpec, part of the standard Julia Pkg library.\n\nresponse_function is a function within this module that you would like to use to respond to AWS  Lambda calls. response_function_param_type specifies the type that the response function is  expecting as its only argument.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.get_responder-Tuple{Module, Symbol, Type}","page":"Functions","title":"Jot.get_responder","text":"function get_responder(\n    mod::Module, \n    response_function::Symbol,\n    response_function_param_type::Type{IT},\n  )::AbstractResponder{IT} where {IT}\n\nReturns an AbstractResponder, a type that holds the function that will be used to respond to AWS Lambda calls.  \n\nmod is a module currently in scope, and response_function is a function within this module that  you would like to use to respond to AWS Lambda calls.\n\nresponse_function is a function within this module that you would like to use to respond to AWS  Lambda calls. response_function_param_type specifies the type that the response function is  expecting as its only argument.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.invoke_function-Tuple{Any, LambdaFunction}","page":"Functions","title":"Jot.invoke_function","text":"invoke_function(\n    request::Any,\n    lambda_function::LambdaFunction;\n    check_state::Bool,\n  )::Tuple{String, Any}\n\nInvokes a Lambda function, hosted on AWS. request is the argument that it will be called with. This will be automatically converted to JSON before sending, so should match the response_function_param_type of the responder used to create the function.\n\nReturns a Tuple of (<request status>, <function return value>).\n\nIf check_state is true, the function will wait for the AWS Lambda function to become available before sending the request. This can be useful if the Lambda function has been created within the  last few seconds, since there is a short set-up time before it can be called.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.is_container_running-Tuple{Container}","page":"Functions","title":"Jot.is_container_running","text":"is_container_running(con::Container)::Bool\n\nReturns true if the given docker container is currently running (not stopped).\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.push_to_ecr!-Tuple{LocalImage}","page":"Functions","title":"Jot.push_to_ecr!","text":"push_to_ecr!(image::LocalImage)::Tuple{ECRRepo, RemoteImage}\n\nPushes the given local docker image to an AWS ECR Repo, a prerequisite of creating an AWS Lambda Function. If an ECR Repo for the given local image does not exist, it will be created automatically. Returns both the ECR Repo, and a RemoteImage object that represents the docker  image that is hosted on the ECR Repo.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.run_image_locally-Tuple{LocalImage}","page":"Functions","title":"Jot.run_image_locally","text":"run_image_locally(local_image::LocalImage; detached::Bool=true)::Container\n\nRuns the given local image, starting a docker container. If detached, the container will run in the background. The container can be stopped/deleted by eg stop_container, delete_container.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.run_test","page":"Functions","title":"Jot.run_test","text":"run_test(\n  image::LocalImage,\n  function_argument::Any = \"\", \n  expected_response::Any = nothing;\n  then_stop::Bool = false,\n)::Tuple{Bool, Float64}\n\nRuns a test of the given local docker image, passing function_argument (if given), and expecting  expected_response(if given). If a function_argument is not given, then it will merely test that any kind of response is received - this response may be an error JSON and the test will still  pass, establishing only that the image can be contacted. Returns a tuple of (test result, time) where time is the time taken for a response to be received, in seconds. \n\nThe test will use an already-running docker container, if one exists. If this is the case then the then_stop parameter tells the function whether to stop the docker container after running the  test. If the runtest function finds no docker container already running, it will start one, and then shut it down afterwards, regardless of the value of `thenstop`.\n\n\n\n\n\n","category":"function"},{"location":"Functions.html#Jot.send_local_request-Tuple{Any}","page":"Functions","title":"Jot.send_local_request","text":"send_local_request(request::Any)\n\nMake a function call to a locally-running docker container and returns the value. A container can be initiated by eg run_image_locally.\n\n\n\n\n\n","category":"method"},{"location":"Functions.html#Jot.stop_container-Tuple{Container}","page":"Functions","title":"Jot.stop_container","text":"stop_container(con::Container)\n\nStops the given docker container, if currently running.\n\n\n\n\n\n","category":"method"},{"location":"index.html#Jot.jl","page":"Home","title":"Jot.jl","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Streamlines the creation and management of AWS Lambda functions written in Julia","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Amazon Web Services does not provide native support for Julia, so functions must be put into docker containers which implement AWS's Lambda API, and uploaded to AWS Elastic Container Registry (ECR). Jot aims to reduce this to a simple, customizable and transparent process, which results in a low-latency Lambda function:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"1. Create a simple script to use as a lambda function and turn it into a Responder","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"write(\n    \"./add_one_script.jl\", \n    \"increment_vector(v::Vector{Int}) = map(x -> x + 1, v)\"\n) \nincrement_responder = Responder(\"./add_one_script.jl\", :increment_vector, Vector{Int})","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"2. Create a local docker image that will implement the responder","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"local_image = create_local_image(\"increment-vector\", increment_responder)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"3. Push this local docker image to AWS ECR; create an AWS role that can execute it","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"(ecr_repo, remote_image) = push_to_ecr!(local_image)\naws_role = create_aws_role(\"increment-vector-role\")","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"4. Create a lambda function from this remote_image... ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"increment_vector_lambda = create_lambda_function(remote_image, aws_role)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"5. ... and test it to see if it's working OK","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"run_test(increment_vector_lambda, function_argument=[2,3,4], expected_result=[3,4,5])","category":"page"},{"location":"index.html#Package-Features","page":"Home","title":"Package Features","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Easily create AWS Lambda functions from Julia packages or scripts\nTest and check for at multiple stages\nAllows easy checking for version consistency - eg, is a given Lambda Function using the correct code?\nPackageCompiler.jl may be optionally used to greatly speed up cold start times\nJSON read/write and error handling is handled by Jot - you need merely write standard Julia ","category":"page"}]
}
