
import { Repository, EntityRepository, getRepository, EntityManager, getConnection } from "typeorm";
import { TransactionDemoEntity } from "./transaction-demo.entity";


@EntityRepository(TransactionDemoEntity)
export class TransactionDemoRepository extends Repository<TransactionDemoEntity>{

    async getDemoFunction(id){
        try{
            const query = this.createQueryBuilder('demo')
            query.select(['demo.id' , 'demo.action'])
                .where('demo.id = :id' , {id})
                // .andWhere('') //-- another condition
                .orderBy('demo.created_at' , "DESC") 
            const data = await query.getOne()  // await query.getMany()
            return {code: 200 , data: data ? data : null}
        }catch(error){
            console.log(error)
            return {code: 201 , message: "Error"}
        }
    }

    async postDemoFunction(createDemoDto) {
        const connection = getConnection(); 
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect(); 
        await queryRunner.startTransaction();
        try{
            const {demo_name , action , updated_by_user_id , testArr} = createDemoDto;

            //#1----------------------------------------
            let createDemo = this.create({
                                demo_name : demo_name,
                                action: action,
                                updated_by_user_id: updated_by_user_id,
                                created_at: new Date()
                            })
            await queryRunner.manager.save(createDemoDto);

            //Insert Into Anothe Table:

            // await Promise.all(testArr.map(async e=>{
            //     await queryRunner.manager.getRepository(Demo2Entity).createQueryBuilder('demo_2')
            //                             .insert()
            //                             .into(Demo2Entity)
            //                             .values({
            //                                 demo_id: createDemoDto.id , 
            //                                 demo_name2 : e.demo_name2 , 
            //                                 action2 : e.action2
            //                             })
            //                             .execute()
            //                             .catch(error => {
            //                                 return ({ code: 201, message: "Error occurred when insert . Please try again later." });
            //                             });
            // }))

            //----------------------------------------------

            //#2--------------------------------------------
            // await queryRunner.manager.getRepository(TransactionDemoEntity).createQueryBuilder('demo')
            //                         .insert()
            //                         .into(TransactionDemoEntity)
            //                         .values({

            //                         })
            //                         .execute()
            //                         .catch(error => {
            //                             return ({ code: 201, message: "Error occurred when insert . Please try again later." });
            //                         });
            //-------------------------------------------------

            await queryRunner.commitTransaction();
            return {code: 200 , message: "Created successfully."}
        }catch(error){
            console.log(error)
            await queryRunner.rollbackTransaction();
            return {code: 201 , message: "Error"}
        }finally {
            await queryRunner.release()
        }
    }

    async putDemoFunction(id , action){ //can use transaction as same as post method
        try{
            const query = this.createQueryBuilder('demo')
            query.update()
                .set({action: action})
                .where('id = :id' , {id})
                // .andWhere('') //.......Another condition
                .execute()
                .catch(error => {
                    return ({ code: 201, message: "Error occurred when update . Please try again later." });
                });
            return ({code : 200, data: "Update successfully"})
        }catch(error){
            console.log(error)
            return {code: 201 , message: "Error"}
        }
    }
    
    async deleteDemoFunction(id){
        try{
            const query = this.createQueryBuilder('demo')
            query.delete()
                .from(TransactionDemoEntity)
                .where('id = :id' , {id})
                // .andWhere('') //.......Another condition
                .execute()
                .catch(error => {
                    return ({ code: 201, message: "Error occurred when delete . Please try again later." });
                });
            return ({code : 200, data: "Delete successfully"})
        }catch(error){
            console.log(error)
            return {code: 201 , message: "Error"}
        }
    }

    async testTransaction1(app_user_id : number, action : string, transactionalEntityManager : EntityManager)
    {
        await transactionalEntityManager.getRepository(TransactionDemoEntity)
                                        .createQueryBuilder('demo')
                                        .insert()
                                        .into(TransactionDemoEntity)
                                        .values({
                                            updated_by_user_id : app_user_id,
                                            action : action
                                        })
                                        .execute();
    }

}