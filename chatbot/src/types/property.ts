export interface PropertyProps {
    id: string;
    title: string;
    image: string | string[];
    length: number;
    width: number;
    front: number;
    direction: string;
    facing: string;
    unit: string;
    area: () => number;
    price: number;
    description: string;
    status: string;
}
