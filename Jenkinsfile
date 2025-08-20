pipeline {
    agent {
        docker { image 'cypress/browsers:node18.19.0-chrome117-ff118' }
    }

    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm install'
            }
        }

        stage('Rodar testes Cypress') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada'
        }
    }
}
