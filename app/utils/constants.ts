export function getSource(source: string) {
  if (source === 'opensea.io') {
    return { text: 'OpenSea', icon: 'opensea'};
  }

  if (source === 'looksrare.org') {
    return { text: 'LooksRare', icon: 'looksrare'};
  }

  if (source === 'sudoswap.xyz') {
    return { text: 'Sudoswap', icon: 'sudoswap'};
  }

  if (source === 'x2y2.io') {
    return { text: 'X2Y2', icon: 'xy2y'};
  }

  if (source === 'foundation.app') {
    return { text: 'Foundation', icon: 'foundation'};
  }

  if (source === 'zora.co') {
    return { text: 'Zora', icon: 'zora'};
  }

  return { text: source, icon: null };
}
