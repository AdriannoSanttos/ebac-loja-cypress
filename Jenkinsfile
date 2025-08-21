pipeline {
    agent any

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}\\.cache"
        REPORTS_DIR = "${WORKSPACE}\\reports"
    }

    stages {
        stage('Preparar ambiente') {
            steps {
                echo "Limpando pastas antigas e preparando ambiente..."
                bat 'rmdir /s /q %REPORTS_DIR% || exit 0'
                bat 'mkdir %REPORTS_DIR%'
                bat 'npm install'
            }
        }

        stage('Executar testes Cypress') {
            steps {
                echo "Rodando testes Cypress..."
               
                bat '''
                npx cypress run ^
                --reporter mochawesome ^
                --reporter-options reportDir=%REPORTS_DIR%,overwrite=false,html=false,json=true || exit 0
                '''
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo "Mesclando relatórios JSON e gerando PDF..."
                bat '''
                if exist %REPORTS_DIR%\\*.json (
                    npx mochawesome-merge %REPORTS_DIR%\\*.json > %REPORTS_DIR%\\report.json
                    npx marge %REPORTS_DIR%\\report.json -f report -o %REPORTS_DIR%
                ) else (
                    echo "Nenhum JSON para gerar relatório"
                )
                '''
            }
        }

        stage('Arquivar artifacts') {
            steps {
                echo "Arquivando artifacts e screenshots..."
                archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'
        }
        failure {
            echo 'Alguns testes falharam, mas pipeline gerou artifacts para análise'
        }
    }
}
