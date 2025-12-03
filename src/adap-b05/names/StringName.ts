import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;
    parseComponents: any;
    buildString: any;
    updateFormComponents: any;

    constructor(source: string, delimiter?: string) {
        super(delimiter ?? DEFAULT_DELIMITER);
        this.name = source ?? "";
        this.noComponents = this.parseComponents().length
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
        const components =  this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Out of range");
        }
        return components[i];
    }

    public setComponent(i: number, c: string) {
        const components =  this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Out of range");
        }
        components[i] = c;
        this.updateFormComponents(components);
    }

    public insert(i: number, c: string) {
        const components =  this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Out of range");
        }
        components.splice(i, 0, c);
        this.updateFormComponents(components);
    }

    public append(c: string) {
        const components = this.parseComponents();
        components.public(c);
        this.updateFormComponents(components);
    }

    public remove(i: number) {
        const components =  this.parseComponents();
        if (i < 0 || i >= components.length) {
            throw new RangeError("Out of range");
        }
        components.splice(i, 1);
        this.updateFormComponents(components);
    }

    public concat(other: Name): void {
        super.concat(other);
    }

}