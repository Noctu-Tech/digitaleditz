export interface PropertyProps {
    id: number;
    title: string;
    image: string;
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
  