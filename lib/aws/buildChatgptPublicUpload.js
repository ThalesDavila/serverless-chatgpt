const GPT_PUBLIC_BUCKET_KEY = 'GptPublicBucket'

export function buildChatgptPublicUpload(bucketName) {
    return {
        [GPT_PUBLIC_BUCKET_KEY]: {
            Type: 'AWS::S3::Bucket',
            DeletionPolicy: 'Retain',
            Properties: {
                BucketName: bucketName
            },
        },
        [`${GPT_PUBLIC_BUCKET_KEY}Policy`]: {
            Type: 'AWS::S3::BucketPolicy',
            Properties: {
                Bucket: {
                    Ref: GPT_PUBLIC_BUCKET_KEY
                },
                PolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Sid: 'PublicRead',
                            Effect: 'Allow',
                            Principal: '*',
                            Action: 's3:GetObject',
                            Resource: {
                                'Fn::Join': [
                                    '',
                                    [
                                        'arn:aws:s3:::',
                                        {
                                            Ref: GPT_PUBLIC_BUCKET_KEY
                                        },
                                        '/*'
                                    ]
                                ]
                            }
                        }
                    ]
                }
            }
        },
    }
}