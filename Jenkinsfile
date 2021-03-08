pipeline {
  environment {
    registry = "apthailand/suchat_s"
    registryCredential = 'docker_ossuchas'
    dockerImage = ''
    image_tag_number = 'happyrefundcs_front_v3.0.4'
    deployments = 'happyrefundcs'
    projects = 'testrepo'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/ossuchas/HappyRefundCS.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":" + image_tag_number
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Deploy to OKD') {
      steps{
          sh "oc login --insecure-skip-tls-verify https://devopsapp01.apthai.com:8443 -usuchat_s -pP@ssw0rd"
          sh "oc project $projects"
          sh "oc patch dc $deployments --patch='{\"spec\":{\"template\":{\"spec\":{\"containers\":[{\"name\": \"$deployments\", \"image\":\"docker.io/$registry:$image_tag_number\"}]}}}}'"
      }
    }
  }
}
