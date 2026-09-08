import { Config } from "../../Config/config";
import type { BookEntity } from "../Types/Entity/book.entity";
import { RequestReturn } from "../Types/requestReturn";


type Entity = BookEntity;

export class BookDataStore {

    private readonly URL = `${Config.apiHost}/book`


    async getAll(): Promise<RequestReturn> {
        const response = new RequestReturn();

        try {
            const request = await fetch(`${this.URL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // credentials: 'include'
            })

            response.status = request.status;
            if (response.status !== 200) {
                const data = await request.json()
                response.message = data.message || "Error retrieving data";
                return response;
            };

            response.data = [...await request.json()];
            response.message = "Data Retrived"

        } catch (e) {

            response.message = "Error retrieving data";
        }
        return response;

    }

    async getById(id: number): Promise<RequestReturn> {
        const response = new RequestReturn();

        try {
            const request = await fetch(`${this.URL}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // credentials: 'include'
            })

            response.status = request.status;
            if (response.status !== 200) {

                const data = await request.json()
                response.message = data.message || "";
                return response;
            };

            response.data = [...await request.json()];
            response.message = "Data Retrived"

        } catch (e) {

            response.message = "Error retrieving data";
        }
        return response;
    }

    async create(entity:Entity): Promise<RequestReturn> {
        const response = new RequestReturn();

        try {
            const request = await fetch(`${this.URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( entity )
                // credentials: 'include'
            })

            response.status = request.status;
            if (response.status !== 201) {

                const data = await request.json()
                response.message = data.message || "";
                return response;
            };

            response.data = [await request.json()];
            response.message = "Created"

        } catch (e) {
            console.log(e)
            response.message = "Error Creating";
        }
        return response;
    }


    async update(entity:Entity): Promise<RequestReturn> {
        const response = new RequestReturn();

        try {
            const request = await fetch(`${this.URL}/${entity.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( entity )
                // credentials: 'include'
            })

            response.status = request.status;
            if (response.status !== 201) {

                const data = await request.json()
                response.message = data.message || "";
                return response;
            };

            response.data = [...await request.json()];
            response.message = "Updated"

        } catch (e) {

            response.message = "Error Updating";
        }
        return response;
    }

    async delete(id: number): Promise<RequestReturn> {
        const response = new RequestReturn();

        try {
            const request = await fetch(`${this.URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                // credentials: 'include'
            })

            response.status = request.status;
            if (response.status !== 200) {

                const data = await request.json()
                response.message = data.message || "";
                return response;
            };

            // response.data = [...await request.json()];
            response.message = "Deleted"

        } catch (e) {

            response.message = "Error Deleting";
        }
        return response;
    }
}