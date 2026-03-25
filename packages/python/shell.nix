# needed because nixos has a problem with poetry and exposed libs :(
with import <nixpkgs> {};

mkShell {
  packages = [
    python3
    poetry
    stdenv.cc.cc.lib
    zlib
    bzip2
    xz
    openblas
    lapack
    libffi
    openssl
  ];

  LD_LIBRARY_PATH = lib.makeLibraryPath [
    stdenv.cc.cc.lib
    zlib
    bzip2
    xz
    openblas
    lapack
    libffi
    openssl
  ];
}
