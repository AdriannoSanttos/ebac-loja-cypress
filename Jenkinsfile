pipeline {
    agent any

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache"
        REPORT_DIR = "${WORKSPACE}/reports"
    }

    stages {
        stage('Preparar Ambiente') {
            steps {
                echo 'Instalando dependências...'
                bat 'npm install'
            }
        }

        stage('Executar testes Cypress') {
            steps {
                
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat """
                    npx cypress run ^
                        --reporter mochawesome ^
                        --reporter-options reportDir=%REPORT_DIR%,overwrite=false,html=false,json=true
                    """
                }
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo 'Gerando relatório PDF a partir do Mochawesome...'
                bat """
                npx mochawesome-merge %REPORT_DIR%/*.json > %REPORT_DIR%/mochawesome.json
                npx marge %REPORT_DIR%/mochawesome.json --reportDir %REPORT_DIR% --reportFilename report
                """
            }
        }

        stage('Arquivar artifacts') {
            steps {
                echo 'Arquivando reports e vídeos...'
                archiveArtifacts artifacts: 'reports/**/*.*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado. Verifique os reports e vídeos arquivados.'
        }
    }
}

