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

  if (source === 'nft.coinbase.com') {
    return { text: 'Coinbase', icon: 'coinbase'};
  }

  if (source === 'rarible.com') {
    return { text: 'Rarible', icon: 'rarible'};
  }

  if (source === 'www.apecoinmarketplace.com') {
    return { text: 'ApeCoin Marketplace', icon: 'apecoin-marketplace'};
  }

  if (source === 'atomic0.com') {
    return { text: 'Atomic0', icon: 'atomic0'};
  }

  return { text: source, icon: null };
}

export function getSort(sortBy: string | null, sortDirection: string | null) {
  if (sortBy === 'floorAskPrice') {
    if (sortDirection === 'desc') {
      return 'Sort Price: High to Low';
    } else {
      return 'Sort Price: Low to High';
    }
  }

  if (sortBy === 'tokenId') {
    if (sortDirection === 'desc') {
      return 'Sort Token ID: High to Low';
    } else {
      return 'Sort Token ID: Low to High';
    }
  }

  if (sortBy === 'rarity') {
    if (sortDirection === 'desc') {
      return 'Sort Rarity: Bottom to Top';
    } else {
      return 'Sort Rarity: Top to Bottom';
    }
  }

  return `${sortBy}: ${sortDirection}`;
}
