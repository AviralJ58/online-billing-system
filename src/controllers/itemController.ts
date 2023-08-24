import { Request, Response } from "express";
import { ds } from "../data-source";
import { validate } from "class-validator";
import { Product } from "../entities/Product";
import { Service } from "../entities/Service";
import { v4 as uuidv4 } from 'uuid';

class ItemController {
    getAllItems = async (req: Request, res: Response) => {
        const prodRepository = ds.getRepository(Product);
        const servRepository = ds.getRepository(Service);
        let products: Product[];
        let services: Service[];
        try {
            products = await prodRepository.find();
            services = await servRepository.find();
            res.send({
                "products": products,
                "services": services
            });
        } catch (error) {
            res.status(401).send("Items not found");
        }
    }

    getProductById = async (req: Request, res: Response) => {
        const prodRepository = ds.getRepository(Product);
        let item: Product;
        try {
            const id = req.params.id;
            item = await prodRepository.findOneOrFail({ where: { id: id } });
            res.send(item);
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    getServiceById = async (req: Request, res: Response) => {
        const servRepository = ds.getRepository(Service);
        let item: Service;
        try {
            const id = req.params.id;
            item = await servRepository.findOneOrFail({ where: { id: id } });
            res.send(item);
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    getAllProducts = async (req: Request, res: Response) => {
        const prodRepository = ds.getRepository(Product);
        let products: Product[];
        try {
            products = await prodRepository.find();
            res.send(products);
        } catch (error) {
            res.status(401).send("Products not found");
        }
    }

    getAllServices = async (req: Request, res: Response) => {
        const servRepository = ds.getRepository(Service);
        let services: Service[];
        try {
            services = await servRepository.find();
            res.send(services);
        } catch (error) {
            res.status(401).send("Services not found");
        }
    }

    createProduct = async (req: Request, res: Response) => {
        const prodRepository = ds.getRepository(Product);
        let product = new Product();
        product.name = req.body.name;
        product.price = req.body.price;
        product.id = uuidv4();

        // validate if the parameters are ok
        const errors = await validate(product);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const prod = await prodRepository.findOne({ where: { name: product.name } });
            if (prod) {
                res.status(409).send("Product already exists");
                return;
            }
            await prodRepository.save(product);
            res.status(201).send(product);
        } catch (e) {
            res.status(409).send("Product already exists");
            return;
        }
    }

    createService = async (req: Request, res: Response) => {
        const servRepository = ds.getRepository(Service);
        let service = new Service();
        service.name = req.body.name;
        service.provider = req.body.provider;
        service.price = req.body.price;
        service.id = uuidv4();

        // validate if the parameters are ok
        const errors = await validate(service);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const serv = await servRepository.findOne({ where: { name: service.name } });
            if (serv) {
                res.status(409).send("Service already exists");
                return;
            }
            await servRepository.save(service);
            res.send(service);
        } catch (e) {
            res.status(409).send("Service already exists");
            return;
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        const prodRepository = ds.getRepository(Product);
        let product: Product;
        try {
            const id = req.params.id;
            product = await prodRepository.findOneOrFail({ where: { id: id } });
            product.name = req.body.name;
            product.price = req.body.price;

            // validate if the parameters are ok
            const errors = await validate(product);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }

            await prodRepository.update(product.id, { name: product.name, price: product.price });
            res.status(200).send("Updated successfully");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    updateService = async (req: Request, res: Response) => {
        const servRepository = ds.getRepository(Service);
        let service: Service;
        try {
            const id = req.params.id;
            service = await servRepository.findOneOrFail({ where: { id: id } });
            service.name = req.body.name;
            service.provider = req.body.provider;
            service.price = req.body.price;

            // validate if the parameters are ok
            const errors = await validate(service);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }

            await servRepository.update(service.id, { name: service.name, provider: service.provider, price: service.price });
            res.status(200).send("Updated successfully");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        const prodRepository = ds.getRepository(Product);
        let product: Product;
        try {
            const id = req.params.id;
            product = await prodRepository.findOneOrFail({ where: { id: id } });
            await prodRepository.remove(product);
            res.status(200).send("Deleted successfully");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }

    deleteService = async (req: Request, res: Response) => {
        const servRepository = ds.getRepository(Service);
        let service: Service;
        try {
            const id = req.params.id;
            service = await servRepository.findOneOrFail({ where: { id: id } });
            await servRepository.remove(service);
            res.status(200).send("Deleted successfully");
        } catch (error) {
            res.status(401).send("Item not found");
        }
    }
}

export default new ItemController();