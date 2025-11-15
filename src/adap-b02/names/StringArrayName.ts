import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.components = source.slice();
    }

    public asString(delimiter: string = this.delimiter): string {
        const escape = (comp: string): string => {
            let result = comp.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER);
            if (delimiter) {
                result = result.split(delimiter).join(ESCAPE_CHARACTER + delimiter);
            }
            return result;
        };

        return this.components.map(escape).join(delimiter);
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length){
            throw new RangeError("Index out of range");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length){
            throw new RangeError("Index out of range");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("Index out of range");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of range");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        const n = other.getNoComponents();
        for (let i = 0; i < n; i++){
            this.components.push(other.getComponent(i));
        }
    }

}