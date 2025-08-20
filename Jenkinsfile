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
                bat 'npx cypress run --reporter mochawesome --reporter-options reportDir=reports,overwrite=false,html=false,json=true'
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                bat '''
                npx mochawesome-merge reports/*.json > reports/report.json
                npx marge reports/report.json -f report -o reports
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/*.*', allowEmptyArchive: true
            echo 'Pipeline finalizada'
        }
    }
}
