import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateHospital1530016283594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        db.createCollection( "hospitals", {
            validator: { $jsonSchema: {
               bsonType: "object",
               properties: {
                  id: {
                     bsonType: "ObjectId",
                     description: "must be a ObjectId"
                  },
                  name: {
                     bsonType : "string",
                     description: "must be a string"
                  }
               }
            } }
         } )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`db.hospitals.drop()`);
    }

}
