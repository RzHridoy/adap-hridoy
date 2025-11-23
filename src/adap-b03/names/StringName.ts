import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;
    buildString: any;
    parseComponents: any;

    constructor(source: string, delimiter?: string) {
        super();
        this.name = source ?? "";
        this.noComponents = this.parseComponents().length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter === this.delimiter) {
            return this.name;
        }
        const components = this.parseComponents();
        return this.buildString(components, delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const components = this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Index is over ranged");
        }
        return components[i];
    }

    public setComponent(i: number, c: string) {
        const components = this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Index is over ranged");
        }
        components[i] = c;
        this.updateFromComponents(components);
    }

    public insert(i: number, c: string) {
        const components = this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Index is over ranged");
        }
        components.splice(i, 0, c);
        this.updateFromComponents(components);
    }

    public append(c: string) {
        const components = this.parseComponents();
        components.push(c);
        this.updateFromComponents(components);
    }

    public remove(i: number) {
        const components = this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Index is over ranged");
        }
        components.splice(i, 1);
        this.updateFromComponents(components);
    }

    public concat(other: Name): void {
        super.concat(other);
    }

    protected updateFromComponents(components: string[]): void {
        this.noComponents = components.length;
        this.name = this.buildString(components, this.delimiter);
    }

}