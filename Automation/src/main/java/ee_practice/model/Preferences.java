package ee_practice.model;

import java.util.List;

public class Preferences {
    private String language;
    private List<String> communicationModes;
    private Boolean notificationsEnabled;

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<String> getCommunicationModes() {
        return communicationModes;
    }

    public void setCommunicationModes(List<String> communicationModes) {
        this.communicationModes = communicationModes;
    }

    public Boolean getNotificationsEnabled() {
        return notificationsEnabled;
    }

    public void setNotificationsEnabled(Boolean notificationsEnabled) {
        this.notificationsEnabled = notificationsEnabled;
    }

    public Preferences(String language, List<String> communicationModes, Boolean notificationsEnabled) {
        this.language = language;
        this.communicationModes = communicationModes;
        this.notificationsEnabled = notificationsEnabled;
    }

    @Override
    public String toString() {
        return "Preferences{" +
                "language='" + language + '\'' +
                ", communicationModes=" + communicationModes +
                ", notificationsEnabled=" + notificationsEnabled +
                '}';
    }
}
