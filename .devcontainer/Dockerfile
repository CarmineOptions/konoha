FROM mcr.microsoft.com/devcontainers/rust:0-1-bullseye

ENV CAIRO_GIT_TAG=v1.0.0-alpha.6
ENV HOME=/home/vscode/
USER vscode
RUN curl -L https://github.com/franalgaba/cairo-installer/raw/main/bin/cairo-installer | bash
RUN echo 'export CAIRO_ROOT="$HOME/.cairo"' >> $HOME/.bashrc
RUN echo 'command -v cairo-compile >/dev/null || export PATH="$CAIRO_ROOT/target/release:$PATH"' >> $HOME/.bashrc

# Cairo now installed. Need to install Scarb
WORKDIR "$HOME"
RUN arch=$(arch) && \
    wget "https://github.com/software-mansion/scarb/releases/download/v0.1.0/scarb-v0.1.0-${arch}-unknown-linux-gnu.tar.gz" && \
    tar -xvzf scarb-v0.1.0-${arch}-unknown-linux-gnu.tar.gz && \
    cp scarb-v0.1.0-${arch}-unknown-linux-gnu/bin/scarb $HOME/scarb
RUN echo 'export PATH="$HOME:$PATH"' >> $HOME/.bashrc
