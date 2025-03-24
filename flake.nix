{
  description = "React development environment with Node.js (unstable)";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
        };
        devPackages = with pkgs; [
          # bruno
          hoppscotch
          nginx
          nodejs
          postman
          yarn
          zsh
        ];
        # postman = pkgs.postman;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = devPackages;
          # buildInputs = [
          #   nodejs
          #   yarn
          #   zsh
          #   # postman
          # ];

          shellHook = ''
            echo "Welcome to the React dev shell!"
            # Add your shell configuration here if needed
            export SHELL=$(which zsh)
            exec zsh
          '';
        };
      });
}
