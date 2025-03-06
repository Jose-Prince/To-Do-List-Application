{
  description = "Flake for Vite + React";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_18  # O la versión que necesites
            yarn        # O usa npm si prefieres
            corepack    # Para manejar versiones de Yarn con `yarn set version stable`
            nodePackages.typescript
            nodePackages.typescript-language-server
          ];
        };

        packages.default = pkgs.stdenv.mkDerivation {
          name = "vite-react-app";
          src = ./.;
          buildInputs = with pkgs; [ nodejs_18 yarn ];

          buildPhase = ''
            yarn install
            yarn build
          '';

          installPhase = ''
            mkdir -p $out
            cp -r dist/* $out/
          '';
        };
      }
    );}
