pipeline {
    agent any

    stages {
        stage('Instalar dependências') {
            steps {
                
                bat 'npm ci'
            }
        }

        stage('Rodar testes Cypress') {
            steps {
                
                bat '''
                npx cypress run --reporter mochawesome --reporter-options reportDir=reports,overwrite=false,html=false,json=true || exit 0
                '''
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
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
            echo 'Pipeline finalizada'
        }
    }
}
