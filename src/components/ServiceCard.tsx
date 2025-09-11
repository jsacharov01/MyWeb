import React, { FC } from "react";
import { Card, CardContent } from "./ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <Card className="dark:bg-gray-800">
      <CardContent className="p-6">
        <h4 className="font-semibold mb-2">{title}</h4>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
