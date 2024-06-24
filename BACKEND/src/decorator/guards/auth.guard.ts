import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "~/decorator/role.decorator";
import { UserRole } from "~/entities/users/User.entity";
import { UsersService } from "~/routes/users/users.service";
import { extractTokenFromHeader, verifyJWT } from "~/utils/auth";

/**
 * This guard is used to check if the user is allowed to access the route.
 * @param roles the roles allowed through this route
 * @returns technical and not important, but returns a guard with the given roles, see implementation if you really need to
 */
@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    readonly jwtService: JwtService,
    readonly usersService: UsersService,
    readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // GET TOKEN
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException('No token provided');

    // VERIFY JWT
    const idUser = await verifyAndExtractId(token, this.jwtService);

    const user: UserInterface = await this.usersService.getOneUserById(idUser);
    // we assigne user to request, to access user later in route handlers
    request['user'] = user;

    const roles = this.reflector.get(Roles, context.getHandler());
    return verifyRoles(user, roles);
  }
}

/**
 * Verify the token and extract it's id
 * @param token the token to verify, from wich we extract the id
 * @param jwtService the jwtService to verify the token
 * @returns the id of the user associated to the token OR UnauthorizedException if token is not valid
 */
const verifyAndExtractId = async (token: string, jwtService: JwtService) => {
  try {
    const payload: UserJwtPayload = await verifyJWT(token, jwtService);
    return payload.id;
  } catch {
    throw new UnauthorizedException('Invalid token');
  }
}

/**
 * 
 * @param allowedRoles all the roles allowed through this route
 * @param user the user to check
 * @returns boolean. True if user is allowed, UnauthorizedException otherwise
 */
const verifyRoles = (user:UserInterface, allowedRoles:UserRole[]): boolean =>{
  if (!allowedRoles || allowedRoles.length === 0) // no role = simply connected
    return true;
  if (!allowedRoles.includes(user.role)) 
    throw new UnauthorizedException();
  
  return true;
}

export { AuthGuard };