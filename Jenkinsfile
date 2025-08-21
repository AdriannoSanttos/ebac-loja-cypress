pipeline {
    agent any

    environment {
        REPORT_DIR = "${WORKSPACE}/reports"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Preparar Ambiente') {
            steps {
                echo 'Instalando dependências...'
                bat 'npm install'
            }
        }

        stage('Executar testes Cypress') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    echo 'Instalando binário do Cypress...'
                    bat 'npx cypress install'

                    echo 'Rodando testes Cypress...'
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
                npx marge %REPORT_DIR%/mochawesome.json ^
                    --reportDir %REPORT_DIR% ^
                    --reportFilename report ^
                    --overwrite
                """
            }
        }

        stage('Arquivar artifacts') {
            steps {
                archiveArtifacts artifacts: 'reports/**/*.*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado. Verifique os reports e vídeos arquivados.'
        }
    }
}
