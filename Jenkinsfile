pipeline {
    agent any

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
