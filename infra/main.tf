module "website" {
  source = "git::https://github.com/afneville/cached-bucket-tf.git?ref=v2"

  providers = {
    aws.n-virginia = aws.n-virginia
  }

	hosted_zone = var.hosted_zone
  bucket_name = var.bucket_name
	domain_names = var.domain_names
}
