pipeline {
    agent any

    stages {
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }

        stage('Rodar testes Cypress') {
            steps {
                bat 'npx cypress run'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada'
        }
    }
}
