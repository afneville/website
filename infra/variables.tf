variable "bucket_name" {
  description = "The name of the S3 bucket for content."
  type        = string
}

variable "domain_names" {
  description = "The domain aliases for the CloudFront distribution (e.g., www.example.com)."
  type        = list(string)
}

variable "hosted_zone" {
  description = "The root domain for Route53 (e.g., example.com)."
  type        = string
}
