
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh '''
                    set -eu
                    test -f index.html
                    test -f package.json
                    test -f tests/test.js
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-pages-token',
                        usernameVariable: 'GH_USER',
                        passwordVariable: 'GH_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu

                        DEPLOY_DIR="$(mktemp -d)"
                        trap 'rm -rf "$DEPLOY_DIR"' EXIT

                        cp index.html "$DEPLOY_DIR/"
                        touch "$DEPLOY_DIR/.nojekyll"

                        cd "$DEPLOY_DIR"
                        git init
                        git checkout -b gh-pages >/dev/null

                        git config user.name "MAKIZHAASRI-D"
                        git config user.email "makiduraijmp@gmail.com"

                        git add .
                        git commit -m "Deploy build ${BUILD_NUMBER}"

                        AUTH_HEADER="$(printf '%s' "$GH_USER:$GH_TOKEN" | base64 -w0)"

                        git -c http.extraheader="AUTHORIZATION: basic $AUTH_HEADER" \
                            push --force \
                            "${GITHUB_PAGES_REPOSITORY}" \
                            HEAD:gh-pages
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline successful.'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
