FROM mcr.microsoft.com/devcontainers/rust:0-1-bullseye

ENV CAIRO_GIT_TAG=v1.0.0
ENV HOME=/home/vscode/
USER vscode
RUN curl -L https://github.com/franalgaba/cairo-installer/raw/main/bin/cairo-installer | bash
RUN echo 'export CAIRO_ROOT="$HOME/.cairo"' >> $HOME/.bashrc
RUN echo 'command -v cairo-compile >/dev/null || export PATH="$CAIRO_ROOT/target/release:$PATH"' >> $HOME/.bashrc
