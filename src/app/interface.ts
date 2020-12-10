export interface SearchImage {
    RawDocsCount      : number,
    RawDocsSearchTime : number,
    ReRankSearchTime  : number,
    CacheHit          : boolean,
    trial             : number,
    limit             : number,
    limit_ttl         : number,
    quota             : number,
    quota_ttl         : number,
    docs              : Docs[]
}
export interface Docs {
    from              : number,
    to                : number,
    anilist_id        : number,
    at                : number,
    season            : string,
    anime             : string,
    filename          : string,
    episode           : number,
    tokenthumb        : string,
    similarity        : number,
    title             : string,
    title_native      : string,
    title_chinese     : string,
    title_english     : string,
    title_romaji      : string,
    mal_id            : number,
    synonyms          : Array<string>,
    synonyms_chinese  : Array<string>,
    is_adult          : boolean
}
