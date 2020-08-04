import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ){}

    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }

    @Query(() => User)
    async user(
        @Args('id') id: string
    ): Promise<User> {
        const user = this.userService.findById(id);
        return user;
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        const user = await this.userService.create(data);
        return user;
    }
}
