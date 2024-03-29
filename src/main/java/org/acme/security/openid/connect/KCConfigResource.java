/**
 * Copyright 2019 Red Hat, Inc, and individual contributors.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.acme.security.openid.connect;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author <a href="mailto:psilva@redhat.com">Pedro Igor</a>
 */
@Path("/api/keycloak")
public class KCConfigResource {

    @ConfigProperty(name = "oidc.url", defaultValue="https://localhost/auth/")
    String kcurl;

    @ConfigProperty(name = "oidc.realm", defaultValue="quarkus")
    String kcrealm;

    @ConfigProperty(name = "oidc.resource", defaultValue="backend-service")
    String kcresource;

    @GET
    @Produces("application/json")
    public String getKeycloakClientConfig() {
        String kcJson = 
        "{ " +
        "\"realm\": \""+ kcrealm +"\", " +
        "\"auth-server-url\": \""+ kcurl +"\", " +
        "\"ssl-required\": \"external\", " +
        "\"resource\": \""+ kcresource +"\", " +
        "\"public-client\": true, " +
        "\"verify-token-audience\": true, " +
        "\"use-resource-role-mappings\": true, " +
        "\"confidential-port\": 0 " +
        "}";
       return kcJson;
    }
}
