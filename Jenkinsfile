pipeline {
    agent any

    environment {
        WORKSPACE = "${env.WORKSPACE}"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Preparar ambiente') {
            steps {
                echo 'Limpando pastas antigas e preparando ambiente...'
                bat 'rmdir /s /q %WORKSPACE%\\reports || exit 0'
                bat 'mkdir %WORKSPACE%\\reports'
                bat 'npm install'
            }
        }

        stage('Executar testes Cypress') {
            steps {
                echo 'Rodando testes Cypress...'
               
                bat '''
                npx cypress run ^
                  --reporter mochawesome ^
                  --reporter-options reportDir=%WORKSPACE%\\reports,overwrite=false,html=false,json=true
                || exit 0
                '''
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo 'Mesclando relatórios JSON e gerando PDF...'
                bat '''
                if exist %WORKSPACE%\\reports\\*.json (
                    npx mochawesome-merge %WORKSPACE%\\reports\\*.json 1>%WORKSPACE%\\reports\\report.json
                    npx marge %WORKSPACE%\\reports\\report.json -f report -o %WORKSPACE%\\reports
                ) else (
                    echo "Nenhum JSON para gerar relatório"
                )
                '''
            }
        }

        stage('Arquivar artifacts') {
            steps {
                echo 'Arquivando artifacts e screenshots...'
                archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'
        }
    }
}

