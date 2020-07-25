export declare class jsScroll {
    scrollMoveObj: any;
    scrollPageY: number;
    scrollY: number;
    fatherScroll: boolean;
    scrollDivList: any[];
    thatDomHtmlCache: string;
    obj: any;
    _obj: any;
    constructor(obj: any, w: any, className: any, fatherScrolls: any, callback?: any);
    pollUpdateScroll(): void;
    scrollResetSize(o: any): void;
    setScrollPosition(o: any): void;
    scrollMove(evt: any, _that: any): boolean;
    onsize(): void;
}
