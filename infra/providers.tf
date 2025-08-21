terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {}
}

provider "aws" {
  region = "eu-west-2"
  default_tags {
    tags = {}
  }
}

provider "aws" {
  alias  = "n-virginia"
  region = "us-east-1"
  default_tags {
    tags = {}
  }
}
