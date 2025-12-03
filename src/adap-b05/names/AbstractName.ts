import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        const escape_components = (comp: string = this.delimiter): string => {
            let out ="";
            for (const ch of comp) {
                if (ch === ESCAPE_CHARACTER || ch === delimiter) {
                    out += ESCAPE_CHARACTER;
                }
                out += ch;
            }
            return out;
        };

        const no_components = this.getNoComponents();
        const parts: string[] = [];
        for (let i = 0; i < no_components; i++) {
            parts.push(escape_components(this.getComponent(i)));
        }
        return parts.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        const no_components = this.getNoComponents();
        if (no_components !== other.getNoComponents())
            return false;
        for (let i = 0; i < no_components; i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        const s = this.asDataString();
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash * 31 + s.charCodeAt(i)) | 0;
        }
        return hash;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        const no_components = other.getNoComponents();
        for (let i = 0; i < no_components; i++) {
            this.append(other.getComponent(i));
        }
    }

}