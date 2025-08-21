pipeline {
    agent any

    environment {
        REPORT_DIR = "${WORKSPACE}\\reports"
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
                bat 'npx cypress install'
                bat "if not exist ${REPORT_DIR} mkdir ${REPORT_DIR}"
            }
        }

        stage('Executar testes Cypress') {
            steps {
                echo 'Rodando testes Cypress...'
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    bat """
                    npx cypress run ^
                        --reporter mochawesome ^
                        --reporter-options reportDir=${REPORT_DIR},overwrite=false,html=false,json=true
                    """
                }
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo 'Gerando relatório PDF a partir do Mochawesome...'
                bat """
                if exist ${REPORT_DIR}\\*.json (
                    npx mochawesome-merge ${REPORT_DIR}/*.json > ${REPORT_DIR}/mochawesome.json
                    npx marge ${REPORT_DIR}/mochawesome.json --reportDir ${REPORT_DIR} --reportFilename report --overwrite
                ) else (
                    echo "Nenhum arquivo JSON gerado, pulando merge."
                )
                """
            }
        }

        stage('Arquivar artifacts') {
            steps {
                echo 'Arquivando reports e vídeos...'
                archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado. Verifique os reports e vídeos arquivados.'
        }
    }
}
